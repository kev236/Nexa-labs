import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity.server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missende velden' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'contactMessage',
      name,
      email,
      subject,
      message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
  }
}