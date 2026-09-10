import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity.server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, product } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is verplicht' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'waitlist',
      email,
      product,
      date: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
  }
}