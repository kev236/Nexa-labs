import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, inquiryType } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missende verplichte velden' }, { status: 400 })
    }

    // Probeer Sanity op te slaan zonder dat een fout de e-mail blokkeert
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
      console.warn('Sanity write skipped/failed:', sanityErr)
    }

    // Verstuur e-mail via Resend
    if (resend) {
      // Bevestiging naar de klant
      await resend.emails.send({
        from: 'Nexa Labs <onboarding@resend.dev>',
        to: email,
        subject: `Ontvangstbevestiging: ${subject || 'Contactbericht'}`,
        html: `<p>Beste ${name},</p><p>Bedankt voor je bericht aan Nexa Labs. We hebben je bericht in goede orde ontvangen en reageren zo snel mogelijk.</p><br/><p>Met vriendelijke groet,<br/><strong>Team Nexa Labs</strong></p>`,
      })

      // Notificatie naar support@nexalabs.tech
      await resend.emails.send({
        from: 'Nexa Contact Form <onboarding@resend.dev>',
        to: 'support@nexalabs.tech',
        replyTo: email,
        subject: `[CONTACT] ${subject || 'Bericht'} van ${name}`,
        html: `
          <div style="font-family: monospace; padding: 20px; background-color: #050505; color: #f4f4f5;">
            <h3>Nieuw contactbericht via de website</h3>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Type:</strong> ${inquiryType || 'general'}</p>
            <p><strong>Onderwerp:</strong> ${subject || 'Geen'}</p>
            <hr style="border-color: #27272a; margin: 15px 0;" />
            <p><strong>Bericht:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}