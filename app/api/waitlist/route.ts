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
      console.warn('Sanity write overgeslagen:', sanityErr)
    }

    // 1. Notificatie naar jouw account e-mailadres
    const adminEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kevin.mlocek2007@gmail.com',
      subject: `⚡ Nieuwe wachtlijst inschrijving: ${productName || 'Algemeen'}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background-color: #050505; color: #f4f4f5;">
          <h3 style="color: #a855f7;">Nieuwe Early Access Inschrijving</h3>
          <p><strong>E-mailadres:</strong> ${email}</p>
          <p><strong>Product:</strong> ${productName || 'Algemeen'}</p>
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
        subject: `Wachtlijst bevestiging: ${productName || 'Nexa Labs'}`,
        html: `<p>Bedankt voor je interesse in <strong>${productName || 'Nexa Labs'}</strong>!</p><p>Je staat nu op de wachtlijst voor vroege toegang.</p>`,
      })
    } catch (clientErr) {
      console.warn('Klantbevestiging overgeslagen door Resend testmodus:', clientErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist API Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}