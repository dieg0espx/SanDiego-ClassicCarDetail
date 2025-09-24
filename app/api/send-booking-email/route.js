import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { orderId } = await request.json()

    // Validate required fields
    if (!orderId) {
      return Response.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Check if required environment variables are set
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_EMAIL']
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars)
      return Response.json(
        { error: 'Email service not configured. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Fetch order details from Supabase
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      console.error('Error fetching order:', orderError)
      return Response.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Format date and time
    const formatDate = (dateString) => {
      if (!dateString) return 'TBD'
      return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      })
    }

    const formatTime = (timeString) => {
      if (!timeString) return 'TBD'
      const hour = parseInt(timeString.split(':')[0])
      return hour === 12 ? '12:00 PM' : 
             hour > 12 ? `${hour - 12}:00 PM` : 
             `${hour}:00 AM`
    }

    // Create email content for customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            Booking Confirmation - San Diego Classic Auto Detail
          </h2>
          
          <div style="background-color: #f0f8ff; border-radius: 6px; padding: 20px; margin: 20px 0; border-left: 4px solid #d4af37;">
            <h3 style="color: #333; margin-bottom: 15px;">Order #${order.id.slice(-8)}</h3>
            <p style="margin: 5px 0; color: #555;"><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
            <p style="margin: 5px 0; color: #555;"><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            <p style="margin: 5px 0; color: #555;"><strong>Payment Method:</strong> ${order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1)}</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Appointment Details</h3>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${formatDate(order.scheduled_date)}</p>
            <p style="margin: 10px 0;"><strong>Time:</strong> ${formatTime(order.scheduled_time)}</p>
            <p style="margin: 10px 0;"><strong>Location:</strong> ${order.location.fullAddress}</p>
            ${order.location.specialInstructions ? `<p style="margin: 10px 0;"><strong>Special Instructions:</strong> ${order.location.specialInstructions}</p>` : ''}
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Services Booked</h3>
            ${order.items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p style="margin: 5px 0; font-weight: bold;">${item.name}</p>
                <p style="margin: 5px 0; color: #666;">Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            `).join('')}
            ${order.service_area_cost > 0 ? `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p style="margin: 5px 0; font-weight: bold;">Service Area Fee (${order.location.serviceAreaName})</p>
                <p style="margin: 5px 0; color: #666;">$${order.service_area_cost.toFixed(2)}</p>
              </div>
            ` : ''}
            <div style="border-top: 2px solid #d4af37; padding: 10px 0; margin-top: 10px;">
              <p style="margin: 5px 0; font-weight: bold; font-size: 18px;">Total: $${order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div style="background-color: #e8f5e8; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">What's Next?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>We'll contact you within 24 hours to confirm your appointment</li>
              <li>You'll receive a text message with our technician's contact information</li>
              <li>Our team will arrive at your specified location at the scheduled time</li>
              <li>Payment will be collected on-site after service completion</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Thank you for choosing San Diego Classic Auto Detail!<br>
              Questions? Contact us at (760) 518-8451
            </p>
          </div>
        </div>
      </div>
    `

    // Create email content for business notification
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            New Booking Received
          </h2>
          
          <div style="background-color: #f0f8ff; border-radius: 6px; padding: 20px; margin: 20px 0; border-left: 4px solid #d4af37;">
            <h3 style="color: #333; margin-bottom: 15px;">Order #${order.id.slice(-8)}</h3>
            <p style="margin: 5px 0; color: #555;"><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
            <p style="margin: 5px 0; color: #555;"><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            <p style="margin: 5px 0; color: #555;"><strong>Payment Method:</strong> ${order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1)}</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Customer Information</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${order.customer_info.firstName} ${order.customer_info.lastName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${order.customer_info.email}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${order.customer_info.phone || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Appointment Details</h3>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${formatDate(order.scheduled_date)}</p>
            <p style="margin: 10px 0;"><strong>Time:</strong> ${formatTime(order.scheduled_time)}</p>
            <p style="margin: 10px 0;"><strong>Location:</strong> ${order.location.fullAddress}</p>
            ${order.location.specialInstructions ? `<p style="margin: 10px 0;"><strong>Special Instructions:</strong> ${order.location.specialInstructions}</p>` : ''}
            ${order.service_area_cost > 0 ? `<p style="margin: 10px 0;"><strong>Service Area Fee:</strong> $${order.service_area_cost.toFixed(2)} (${order.location.serviceAreaName})</p>` : ''}
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Services Booked</h3>
            ${order.items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p style="margin: 5px 0; font-weight: bold;">${item.name}</p>
                <p style="margin: 5px 0; color: #666;">Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            `).join('')}
            <div style="border-top: 2px solid #d4af37; padding: 10px 0; margin-top: 10px;">
              <p style="margin: 5px 0; font-weight: bold; font-size: 18px;">Total: $${order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              New booking received from San Diego Classic Auto Detail website.
            </p>
          </div>
        </div>
      </div>
    `

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log('SMTP server is ready to take our messages')
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return Response.json(
        { error: 'Email service configuration error. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Send emails to both customer and business
    const customerEmailPromise = transporter.sendMail({
      from: `"San Diego Classic Auto Detail" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: order.customer_info.email,
      subject: `Booking Confirmation - Order #${order.id.slice(-8)}`,
      html: customerEmailHtml,
      replyTo: process.env.SMTP_FROM || process.env.SMTP_USER,
    })

    const businessEmailPromise = transporter.sendMail({
      from: `"San Diego Classic Auto Detail" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New Booking - Order #${order.id.slice(-8)} - ${order.customer_info.firstName} ${order.customer_info.lastName}`,
      html: businessEmailHtml,
      replyTo: order.customer_info.email,
    })

    // Wait for both emails to be sent
    const [customerInfo, businessInfo] = await Promise.all([customerEmailPromise, businessEmailPromise])

    console.log('Booking confirmation emails sent successfully:', {
      customer: customerInfo.messageId,
      business: businessInfo.messageId
    })

    return Response.json({ 
      success: true,
      customerEmailId: customerInfo.messageId,
      businessEmailId: businessInfo.messageId
    })
  } catch (error) {
    console.error('Booking email sending error:', error)
    
    // Provide more specific error messages
    if (error.code === 'EAUTH') {
      return Response.json(
        { error: 'Email authentication failed. Please check your credentials.' },
        { status: 500 }
      )
    } else if (error.code === 'ECONNECTION') {
      return Response.json(
        { error: 'Could not connect to email server. Please check your SMTP settings.' },
        { status: 500 }
      )
    } else {
      return Response.json(
        { error: 'Failed to send booking confirmation emails. Please try again later.' },
        { status: 500 }
      )
    }
  }
}
