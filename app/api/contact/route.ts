import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity.server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missende verplichte velden' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'contactMessage',
      name,
      email,
      subject: subject || 'Nieuw contactbericht',
      message,
      createdAt: new Date().toISOString(),
    })

    if (resend) {
      await resend.emails.send({
        from: 'Nexa Labs <onboarding@resend.dev>',
        to: email,
        subject: `Ontvangstbevestiging: ${subject || 'Contactbericht'}`,
        html: `<p>Beste ${name},</p><p>Bedankt voor je bericht aan Nexa Labs. We hebben je bericht in goede orde ontvangen en reageren zo snel mogelijk.</p><br/><p>Met vriendelijke groet,<br/><strong>Team Nexa Labs</strong></p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}