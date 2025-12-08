import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { amount, orderData } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      )
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // TEST: $1 USD (100 cents) - TODO: change back to Math.round(amount * 100)
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: orderData?.order_id || '',
        user_id: orderData?.user_id || '',
        scheduled_date: orderData?.scheduled_date || '',
        scheduled_time: orderData?.scheduled_time || '',
        customer_email: orderData?.customer_info?.email || '',
        customer_name: `${orderData?.customer_info?.firstName || ''} ${orderData?.customer_info?.lastName || ''}`.trim(),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
