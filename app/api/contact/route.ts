import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('RESEND_API_KEY ontbreekt in environment variables')
    return NextResponse.json(
      { error: 'Server configuratiefout: RESEND_API_KEY ontbreekt' },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

  try {
    const body = await request.json()
    const { name, email, subject, message, inquiryType } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missende verplichte velden' }, { status: 400 })
    }

    // Sanity opslag (optioneel)
    try {
      const { writeClient } = await import('@/lib/sanity.server')
      if (writeClient) {
        await writeClient.create({
          _type: 'contactMessage',
          name,
          email,
          inquiryType: inquiryType || 'general',
          subject: subject || 'Nieuw contactbericht',
          message,
          createdAt: new Date().toISOString(),
        })
      }
    } catch (sanityErr) {
      console.warn('Sanity write overgeslagen:', sanityErr)
    }

    // Gebruik onboarding@resend.dev zolang je domein nog niet geverifieerd is in Resend
    const fromAddress = process.env.NODE_ENV === 'production' && process.env.VERIFIED_DOMAIN
      ? 'Nexa Contact Form <support@nexalabs.tech>'
      : 'Nexa Contact Form <onboarding@resend.dev>'

    const emailResponse = await resend.emails.send({
      from: fromAddress,
      to: 'support@nexalabs.tech',
      replyTo: email,
      subject: `[${(inquiryType || 'CONTACT').toUpperCase()}] ${subject || 'Bericht van'} ${name}`,
      html: `
        <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
          <h2 style="color: #a855f7;">Nieuw Contactbericht Ontvangen</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Type:</strong> ${inquiryType || 'general'}</p>
          <p><strong>Onderwerp:</strong> ${subject || 'Geen'}</p>
          <hr style="border-color: #27272a; margin: 20px 0;" />
          <p><strong>Bericht:</strong></p>
          <div style="background-color: #09090b; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    })

    if (emailResponse.error) {
      console.error('Resend Fout:', emailResponse.error)
      return NextResponse.json({ error: emailResponse.error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}