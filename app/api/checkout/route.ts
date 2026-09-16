import { NextResponse } from 'next/server'

/**
 * Paid checkout is intentionally disabled — Nexa Labs isn't registered
 * with the KvK yet, so it can't legally take payments as a business.
 * No component currently links here (see components/CheckoutButton.tsx,
 * unused), but the route itself must refuse regardless of the UI, since
 * anyone who knows the endpoint could otherwise trigger a real charge.
 *
 * Re-enabling this requires, at minimum: KvK + VAT registration, real
 * VAT-inclusive pricing, and EU withdrawal-right handling (disclosure +
 * withdrawal button per Directive (EU) 2023/2673, or a valid consent/
 * waiver flow for immediate digital delivery) — see AGENTS.md.
 */
export async function POST() {
  return NextResponse.json(
    { error: 'Checkout is temporarily unavailable. Join the waitlist instead — we will email you when purchasing opens.' },
    { status: 503 }
  )
}
