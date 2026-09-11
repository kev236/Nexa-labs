import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, productName } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Geldig e-mailadres verplicht' }, { status: 400 })
    }

    // Sanity opslag (fail-safe)
    try {
      const { writeClient } = await import('@/lib/sanity.server')
      if (writeClient) {
        await writeClient.create({
          _type: 'waitlist',
          email,
          productName: productName || 'Algemeen',
          createdAt: new Date().toISOString(),
        })
      }
    } catch (sanityErr) {
      console.warn('Sanity write skipped:', sanityErr)
    }

    // Resend e-mails
    if (resend) {
      // 1. Bevestigingsmail naar de KLANT (vereist geverifieerd domein)
      const clientEmail = await resend.emails.send({
        from: 'Nexa Labs <support@nexalabs.tech>',
        to: email,
        subject: `Je staat op de wachtlijst voor ${productName || 'Nexa Labs'}`,
        html: `
          <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
            <h2 style="color: #a855f7; margin-bottom: 12px;">Nexa Labs Early Access</h2>
            <p>Bedankt voor je interesse in <strong>${productName || 'Nexa Labs'}</strong>!</p>
            <p>Je staat nu officieel geregistreerd voor vroege toegang. We sturen je een update zodra er een bètaversie beschikbaar is.</p>
            <br/>
            <p style="color: #a1a1aa; font-size: 12px;">Team Nexa Labs — Small software. Big impact.</p>
          </div>
        `,
      })

      if (clientEmail.error) {
        console.error('Resend Client Email Error:', clientEmail.error)
      }

      // 2. Interne melding naar JOUW E-MAIL
      await resend.emails.send({
        from: 'Nexa System <support@nexalabs.tech>',
        to: 'support@nexalabs.tech',
        subject: `⚡ Nieuwe wachtlijst aanmelding: ${productName || 'Algemeen'}`,
        html: `<p><strong>Subscriber:</strong> ${email}</p><p><strong>Product:</strong> ${productName || 'Algemeen'}</p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist API Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}