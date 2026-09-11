import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const apiKey = process.env.STRIPE_SECRET_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is niet ingesteld in de omgevingsvariabelen.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { productName, price, productSlug } = body

    if (!price || !productName) {
      return NextResponse.json({ error: 'Price and product name are required' }, { status: 400 })
    }

    const stripe = new Stripe(apiKey, {
      apiVersion: '2026-08-26.dahlia' as any,
    })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
              description: 'Nexa Labs Lifetime License',
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&product=${productSlug}`,
      cancel_url: `${appUrl}/products/${productSlug}`,
      metadata: {
        productSlug,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}