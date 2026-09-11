import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, productName } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Probeer Sanity op te slaan zonder dat een fout de e-mail blokkeert
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
      console.warn('Sanity write skipped/failed:', sanityErr)
    }

    // Verstuur e-mail via Resend
    if (resend) {
      await resend.emails.send({
        from: 'Nexa Labs <onboarding@resend.dev>',
        to: email,
        subject: `Je staat op de wachtlijst voor ${productName || 'Nexa Labs'}`,
        html: `<p>Bedankt voor je interesse in <strong>${productName || 'Nexa Labs'}</strong>!</p><p>Je staat nu officieel geregistreerd voor vroege toegang. We sturen je een update zodra er een bètaversie beschikbaar is.</p>`,
      })

      // Stuur ook een melding naar support@nexalabs.tech
      await resend.emails.send({
        from: 'Nexa System <onboarding@resend.dev>',
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