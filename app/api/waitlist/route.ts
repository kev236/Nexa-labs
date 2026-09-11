import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity.server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, productName } = body

    if (!email) {
      return NextResponse.json({ error: 'E-mailadres is verplicht' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'waitlist',
      email,
      productName: productName || 'Algemeen',
      createdAt: new Date().toISOString(),
    })

    if (resend) {
      await resend.emails.send({
        from: 'Nexa Labs <hello@nexalabs.tech>',
        to: email,
        subject: `Je staat op de wachtlijst voor ${productName || 'Nexa Labs'}`,
        html: `<p>Bedankt voor je interesse in <strong>${productName || 'Nexa Labs'}</strong>!</p><p>Je staat nu officieel geregistreerd voor vroege toegang. We sturen je een update zodra er een bètaversie beschikbaar is.</p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}