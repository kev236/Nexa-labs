import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
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

    // 1. Opslaan in Sanity CMS
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
      console.warn('Sanity opslag overgeslagen:', sanityErr)
    }

    // 2. Bericht vanuit het formulier versturen naar support@nexalabs.tech
    const adminEmail = await resend.emails.send({
      from: 'Nexa Contact Form <support@nexalabs.tech>',
      to: 'support@nexalabs.tech',
      replyTo: email,
      subject: `[${(inquiryType || 'CONTACT').toUpperCase()}] ${subject || 'Nieuw bericht van'} ${name}`,
      html: `
        <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
          <h2 style="color: #a855f7; margin-bottom: 16px;">Nieuw Contactbericht Ontvangen</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mailadres klant:</strong> <a href="mailto:${email}" style="color: #c084fc;">${email}</a></p>
          <p><strong>Type aanvraag:</strong> ${inquiryType || 'general'}</p>
          <p><strong>Onderwerp:</strong> ${subject || 'Geen onderwerp'}</p>
          <hr style="border-color: #27272a; margin: 20px 0;" />
          <p><strong>Bericht:</strong></p>
          <div style="background-color: #09090b; padding: 16px; border-radius: 8px; border: 1px solid #18181b; white-space: pre-wrap; color: #e4e4e7;">${message}</div>
        </div>
      `,
    })

    if (adminEmail.error) {
      console.error('Resend Fout bij verzenden naar support:', adminEmail.error)
      return NextResponse.json({ error: adminEmail.error.message }, { status: 400 })
    }

    // 3. Bevestigingsmail naar de klant
    try {
      await resend.emails.send({
        from: 'Nexa Labs <support@nexalabs.tech>',
        to: email,
        subject: `Ontvangstbevestiging: ${subject || 'Contactbericht Nexa Labs'}`,
        html: `
          <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
            <p>Beste ${name},</p>
            <p>Bedankt voor je bericht aan Nexa Labs. We hebben je bericht in goede orde ontvangen en reageren zo snel mogelijk.</p>
            <br/>
            <p style="color: #a1a1aa; font-size: 12px;">Met vriendelijke groet,<br/><strong>Team Nexa Labs</strong></p>
          </div>
        `,
      })
    } catch (clientErr) {
      console.warn('Klantbevestiging kon niet worden verzonden:', clientErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}