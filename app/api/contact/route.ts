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
    const { name, email, subject, message, inquiryType } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Save to Sanity CMS (fail-safe — never blocks the reply)
    try {
      const { writeClient } = await import('@/lib/sanity.server')
      if (writeClient) {
        await writeClient.create({
          _type: 'contactMessage',
          name,
          email,
          inquiryType: inquiryType || 'general',
          subject: subject || 'New contact message',
          message,
          createdAt: new Date().toISOString(),
        })
      }
    } catch (sanityErr) {
      console.warn('Sanity write skipped:', sanityErr)
    }

    // 2. Notify the team
    const adminEmail = await resend.emails.send({
      from: 'Nexa Contact Form <support@nexalabs.tech>',
      to: 'support@nexalabs.tech',
      replyTo: email,
      subject: `[${(inquiryType || 'CONTACT').toUpperCase()}] ${subject || 'Message from'} ${name}`,
      html: `
        <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
          <h2 style="color: #a855f7; margin-bottom: 16px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #c084fc;">${email}</a></p>
          <p><strong>Inquiry type:</strong> ${inquiryType || 'general'}</p>
          <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
          <hr style="border-color: #27272a; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background-color: #09090b; padding: 16px; border-radius: 8px; border: 1px solid #18181b; white-space: pre-wrap; color: #e4e4e7;">${message}</div>
        </div>
      `,
    })

    if (adminEmail.error) {
      console.error('Resend error:', adminEmail.error)
      return NextResponse.json({ error: adminEmail.error.message }, { status: 400 })
    }

    // 3. Confirmation to the customer
    try {
      await resend.emails.send({
        from: 'Nexa Labs <support@nexalabs.tech>',
        to: email,
        subject: `We received your message: ${subject || 'Contact — Nexa Labs'}`,
        html: `
          <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
            <p>Hi ${name},</p>
            <p>Thanks for reaching out to Nexa Labs. We've received your message and will get back to you as soon as possible.</p>
            <br/>
            <p style="color: #a1a1aa; font-size: 12px;">Team Nexa Labs</p>
          </div>
        `,
      })
    } catch (clientErr) {
      console.warn('Customer confirmation failed:', clientErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
