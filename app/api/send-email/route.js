import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { name, email, phone, service, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required' },
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

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            ${service ? `<p style="margin: 10px 0;"><strong>Service:</strong> ${service}</p>` : ''}
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <p style="margin: 0; line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              This message was sent from the San Diego Classic Auto Detail contact form.
            </p>
          </div>
        </div>
      </div>
    `

    // Email text version
    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${service ? `Service: ${service}` : ''}

Message:
${message}

---
This message was sent from the San Diego Classic Auto Detail contact form.
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

    // Send email
    const info = await transporter.sendMail({
      from: `"San Diego Classic Auto Detail" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: ['tecnodael@gmail.com', 'sdclassicautodetail@outlook.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: emailText,
      html: emailHtml,
      replyTo: email,
    })

    console.log('Email sent successfully:', info.messageId)
    return Response.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    
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
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }
  }
}
