import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('loyalty_club_emails')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    // Insert new email
    const { data, error } = await supabase
      .from('loyalty_club_emails')
      .insert([
        {
          email: email.toLowerCase(),
          subscribed_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe email' },
        { status: 500 }
      )
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(email)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail the whole request if email fails
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to loyalty club', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in loyalty club API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendWelcomeEmail(email) {
  // Check if email is configured
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName])

  if (missingEnvVars.length > 0) {
    console.log('Email not configured, skipping welcome email')
    return
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

  // Create welcome email HTML
  const welcomeEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #d4af37; margin: 0; font-size: 32px; font-weight: bold;">Welcome to the Club!</h1>
          <div style="width: 60px; height: 3px; background-color: #d4af37; margin: 15px auto;"></div>
        </div>

        <div style="background-color: #f0f8ff; border-radius: 6px; padding: 25px; margin: 20px 0; border-left: 4px solid #d4af37;">
          <h2 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 24px;">You're Now Part of Our Exclusive Loyalty Club!</h2>
          <p style="margin: 0; color: #555; line-height: 1.6; font-size: 16px;">
            Thank you for joining San Diego Classic Auto Detail's Loyalty Club. You're now part of an exclusive group that gets first access to special offers, seasonal promotions, and member-only discounts!
          </p>
        </div>

        <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 20px;">Your Member Benefits:</h3>
          <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong style="color: #d4af37;">Exclusive Holiday Deals</strong> - Be the first to know about special holiday promotions</li>
            <li style="margin-bottom: 10px;"><strong style="color: #d4af37;">Seasonal Promotions</strong> - Get access to limited-time seasonal offers</li>
            <li style="margin-bottom: 10px;"><strong style="color: #d4af37;">Member-Only Discounts</strong> - Enjoy special pricing on premium detailing services</li>
            <li style="margin-bottom: 10px;"><strong style="color: #d4af37;">Priority Booking</strong> - Skip the line during busy periods with priority scheduling</li>
            <li style="margin-bottom: 10px;"><strong style="color: #d4af37;">Early Access</strong> - Be the first to try our new services and packages</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://sdclassicautodetail.com'}/services" style="display: inline-block; background-color: #d4af37; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Book Your Service Now</a>
        </div>

        <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Stay Connected</h3>
          <p style="margin: 10px 0; color: #555;"><strong>Phone:</strong> (760) 518-8451</p>
          <p style="margin: 10px 0; color: #555;"><strong>Email:</strong> SDclassicautodetail@outlook.com</p>
          <p style="margin: 10px 0; color: #555;"><strong>Service Area:</strong> Vista, CA 92081 & Surrounding Areas</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px; margin: 5px 0;">
            You're receiving this email because you joined our Loyalty Club at<br>
            San Diego Classic Auto Detail
          </p>
          <p style="color: #999; font-size: 12px; margin: 15px 0;">
            No spam, just great deals. You can unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  `

  const welcomeEmailText = `
Welcome to the San Diego Classic Auto Detail Loyalty Club!

Thank you for joining our exclusive loyalty club. You're now part of a select group that gets first access to special offers, seasonal promotions, and member-only discounts!

YOUR MEMBER BENEFITS:
- Exclusive Holiday Deals - Be the first to know about special holiday promotions
- Seasonal Promotions - Get access to limited-time seasonal offers
- Member-Only Discounts - Enjoy special pricing on premium detailing services
- Priority Booking - Skip the line during busy periods with priority scheduling
- Early Access - Be the first to try our new services and packages

STAY CONNECTED:
Phone: (760) 518-8451
Email: SDclassicautodetail@outlook.com
Service Area: Vista, CA 92081 & Surrounding Areas

---
You're receiving this email because you joined our Loyalty Club at San Diego Classic Auto Detail.
No spam, just great deals. You can unsubscribe anytime.
  `

  // Send email
  await transporter.sendMail({
    from: `"San Diego Classic Auto Detail" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: 'Welcome to the Loyalty Club!',
    text: welcomeEmailText,
    html: welcomeEmailHtml,
  })

  console.log('Welcome email sent successfully to:', email)
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const adminAuth = searchParams.get('admin')

    // Simple admin check - you might want to make this more secure
    if (!adminAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('loyalty_club_emails')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch emails' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { emails: data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching loyalty club emails:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
