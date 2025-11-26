import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { orderData } = await request.json()

    if (!orderData) {
      return NextResponse.json(
        { error: 'Order data is required' },
        { status: 400 }
      )
    }

    // Create or retrieve customer
    const customerEmail = orderData.customer_info?.email
    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer email is required for subscriptions' },
        { status: 400 }
      )
    }

    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    })

    let customer
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email: customerEmail,
        name: `${orderData.customer_info?.firstName || ''} ${orderData.customer_info?.lastName || ''}`.trim(),
        metadata: {
          user_id: orderData.user_id || '',
          phone: orderData.customer_info?.phone || '',
        }
      })
    }

    // Create or get the product
    const products = await stripe.products.list({
      active: true,
      limit: 1,
    })

    let product
    if (products.data.length > 0 && products.data[0].name === 'Monthly Maintenance Package') {
      product = products.data[0]
    } else {
      product = await stripe.products.create({
        name: 'Monthly Maintenance Package',
        description: 'Monthly scheduled detailing service with priority booking',
      })
    }

    // Create or get the price
    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
      limit: 1,
    })

    let price
    if (prices.data.length > 0) {
      price = prices.data[0]
    } else {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: 16000, // $160.00 in cents
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
      })
    }

    // Create subscription - Stripe will automatically create an invoice with payment_intent
    // when using add_invoice_items or when the subscription starts
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: price.id,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card']
      },
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      metadata: {
        order_id: orderData.order_id || '',
        user_id: orderData.user_id || '',
        scheduled_date: orderData.scheduled_date || '',
        scheduled_time: orderData.scheduled_time || '',
        location: JSON.stringify(orderData.location || {}),
      }
    })

    console.log('Subscription created:', subscription.id)
    console.log('Subscription status:', subscription.status)
    console.log('Pending setup intent:', subscription.pending_setup_intent)

    // Check if there's a pending_setup_intent (used for future payments)
    if (subscription.pending_setup_intent) {
      const setupIntent = subscription.pending_setup_intent
      console.log('Using pending_setup_intent:', setupIntent.id)

      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret: typeof setupIntent === 'string'
          ? (await stripe.setupIntents.retrieve(setupIntent)).client_secret
          : setupIntent.client_secret,
        customerId: customer.id,
        isSetupIntent: true
      })
    }

    // Otherwise, get payment intent from the invoice
    const invoice = typeof subscription.latest_invoice === 'string'
      ? await stripe.invoices.retrieve(subscription.latest_invoice, { expand: ['payment_intent'] })
      : subscription.latest_invoice

    console.log('Invoice status:', invoice.status)
    console.log('Invoice payment_intent:', invoice.payment_intent)

    // If invoice has payment_intent, use it
    if (invoice.payment_intent) {
      const paymentIntent = typeof invoice.payment_intent === 'string'
        ? await stripe.paymentIntents.retrieve(invoice.payment_intent)
        : invoice.payment_intent

      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id,
        isSetupIntent: false
      })
    }

    // If no payment_intent on invoice, finalize it to create one
    // This happens when the invoice is in 'draft' status
    console.log('No payment_intent on invoice, finalizing invoice...')

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id, {
      expand: ['payment_intent']
    })

    console.log('Finalized invoice status:', finalizedInvoice.status)
    console.log('Finalized invoice payment_intent:', finalizedInvoice.payment_intent)

    if (finalizedInvoice.payment_intent) {
      const paymentIntent = typeof finalizedInvoice.payment_intent === 'string'
        ? await stripe.paymentIntents.retrieve(finalizedInvoice.payment_intent)
        : finalizedInvoice.payment_intent

      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id,
        invoiceId: finalizedInvoice.id,
        isSetupIntent: false
      })
    }

    // This shouldn't happen, but handle gracefully
    return NextResponse.json(
      { error: 'Unable to create payment for subscription' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    )
  }
}
