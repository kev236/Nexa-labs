import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server configuration error: RESEND_API_KEY is missing' },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

  try {
    const body = await request.json()
    const { email, productName } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }

    // 1. Save to Sanity (fail-safe — never blocks the confirmation email)
    try {
      const { writeClient } = await import('@/lib/sanity.server')
      if (writeClient) {
        await writeClient.create({
          _type: 'waitlist',
          email,
          productName: productName || 'General',
          createdAt: new Date().toISOString(),
        })
      }
    } catch (sanityErr) {
      console.warn('Sanity write skipped:', sanityErr)
    }

    // 2. Confirmation email straight to the customer
    const clientEmail = await resend.emails.send({
      from: 'Nexa Labs <support@nexalabs.tech>',
      to: email,
      subject: `You're on the waitlist for ${productName || 'Nexa Labs'}`,
      html: `
        <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
          <h2 style="color: #a855f7; margin-bottom: 12px;">Nexa Labs Early Access</h2>
          <p>Thanks for your interest in <strong>${productName || 'Nexa Labs'}</strong>!</p>
          <p>You're now registered for early access. We'll email you the moment a beta or release becomes available.</p>
          <br/>
          <p style="color: #a1a1aa; font-size: 12px;">Team Nexa Labs — Small software. Big impact.</p>
        </div>
      `,
    })

    // 3. Internal notification
    const adminEmail = await resend.emails.send({
      from: 'Nexa System <support@nexalabs.tech>',
      to: 'support@nexalabs.tech',
      subject: `⚡ New waitlist signup: ${productName || 'General'}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background-color: #050505; color: #f4f4f5;">
          <h3 style="color: #a855f7;">New Early Access Signup</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Product:</strong> ${productName || 'General'}</p>
        </div>
      `,
    })

    if (clientEmail.error || adminEmail.error) {
      console.error('Resend send error:', clientEmail.error || adminEmail.error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
