import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server configuration error: RESEND_API_KEY is missing' },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

  try {
    const body = await request.json()
    const { email, useCase, company_website } = body

    // A hidden field real visitors never fill in; a bot's autofill often does.
    if (typeof company_website === 'string' && company_website.trim()) {
      return NextResponse.json({ success: true })
    }

    if (!email || !String(email).includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }
    if (!useCase || !String(useCase).trim()) {
      return NextResponse.json({ error: "Tell us what you'd use it for" }, { status: 400 })
    }

    // 1. Save to Sanity (fail-safe — never blocks the reply)
    try {
      const { writeClient } = await import('@/lib/sanity.server')
      if (writeClient) {
        await writeClient.create({
          _type: 'apiAccessRequest',
          email,
          useCase,
          createdAt: new Date().toISOString(),
        })
      }
    } catch (sanityErr) {
      console.warn('Sanity write skipped:', sanityErr)
    }

    // 2. Notify the team (billing + key issuance is manual — this is the
    // only place that request surfaces)
    const adminEmail = await resend.emails.send({
      from: 'Nexa Labs <support@nexalabs.tech>',
      to: 'support@nexalabs.tech',
      replyTo: email,
      subject: `[API ACCESS] Clip Scoring API request from ${email}`,
      html: `
        <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
          <h2 style="color: #a855f7; margin-bottom: 16px;">New Clip Scoring API access request</h2>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #c084fc;">${email}</a></p>
          <hr style="border-color: #27272a; margin: 20px 0;" />
          <p><strong>Use case:</strong></p>
          <div style="background-color: #09090b; padding: 16px; border-radius: 8px; border: 1px solid #18181b; white-space: pre-wrap; color: #e4e4e7;">${useCase}</div>
        </div>
      `,
    })

    if (adminEmail.error) {
      console.error('Resend error:', adminEmail.error)
      return NextResponse.json({ error: adminEmail.error.message }, { status: 400 })
    }

    // 3. Confirmation to the requester
    try {
      await resend.emails.send({
        from: 'Nexa Labs <support@nexalabs.tech>',
        to: email,
        subject: 'We received your Clip Scoring API access request',
        html: `
          <div style="font-family: monospace; padding: 24px; background-color: #050505; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
            <p>Thanks for your interest in the Clip Scoring API.</p>
            <p>We review requests and reply by email to work out access and billing directly — no card form, no automated signup.</p>
            <br/>
            <p style="color: #a1a1aa; font-size: 12px;">Team Nexa Labs — Small software. Big impact.</p>
          </div>
        `,
      })
    } catch (clientErr) {
      console.warn('Customer confirmation failed:', clientErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Request API access error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
