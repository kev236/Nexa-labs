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

    // Sanity opslag (fail-safe)
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

    // 1. Bericht naar jouw account e-mailadres
    const adminEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kevin.mlocek2007@gmail.com',
      replyTo: email,
      subject: `[${(inquiryType || 'CONTACT').toUpperCase()}] ${subject || 'Bericht van'} ${name}`,
      html: `
        <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
          <h2 style="color: #a855f7;">Nieuw Contactbericht Ontvangen</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail van klant:</strong> ${email}</p>
          <p><strong>Type:</strong> ${inquiryType || 'general'}</p>
          <p><strong>Onderwerp:</strong> ${subject || 'Geen'}</p>
          <hr style="border-color: #27272a; margin: 20px 0;" />
          <p><strong>Bericht:</strong></p>
          <div style="background-color: #09090b; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    })

    if (adminEmail.error) {
      console.error('Resend Fout:', adminEmail.error)
      return NextResponse.json({ error: adminEmail.error.message }, { status: 400 })
    }

    // 2. Bevestiging naar klant (stilzwijgend opvangen als Resend testmodus dit blokkeert)
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: `Ontvangstbevestiging: ${subject || 'Contactbericht Nexa Labs'}`,
        html: `<p>Beste ${name},</p><p>Bedankt voor je bericht aan Nexa Labs. We hebben je bericht in goede orde ontvangen.</p>`,
      })
    } catch (clientErr) {
      console.warn('Klantbevestiging overgeslagen door Resend testmodus:', clientErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}