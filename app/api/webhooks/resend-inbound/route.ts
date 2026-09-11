import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY ontbreekt' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  try {
    const payload = await request.json()

    // Resend triggert het 'email.received' event bij een inkomende mail
    if (payload.type === 'email.received') {
      const emailId = payload.data?.email_id || payload.data?.id

      if (emailId) {
        // Haal de volledige inkomende e-mail op met de Receiving API
        const { data: inboundEmail, error } = await resend.emails.receiving.get(emailId)

        if (error) {
          console.error('Resend Receiving Error:', error)
          return NextResponse.json({ error: error.message }, { status: 400 })
        }

        console.log('Inkomende e-mail ontvangen van:', inboundEmail?.from)
        console.log('Onderwerp:', inboundEmail?.subject)

        // Sla de inkomende Gmail op in Sanity CMS onder 'contactMessage'
        try {
          const { writeClient } = await import('@/lib/sanity.server')
          if (writeClient) {
            await writeClient.create({
              _type: 'contactMessage',
              name: inboundEmail?.from || 'Directe E-mail',
              email: inboundEmail?.from || '',
              subject: inboundEmail?.subject || 'Inkomende e-mail',
              message: inboundEmail?.html || inboundEmail?.text || '',
              inquiryType: 'inbound_email',
              createdAt: new Date().toISOString(),
            })
          }
        } catch (sanityErr) {
          console.warn('Sanity opslag overgeslagen voor inkomende mail:', sanityErr)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Inbound Webhook Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}