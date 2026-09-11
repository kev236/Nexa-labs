'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CheckoutButtonProps {
  productName: string
  productSlug: string
  price: number
}

export default function CheckoutButton({ productName, productSlug, price }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, productSlug, price }),
      })

      const data = await response.json()

      if (data.url) {
        // Stuur gebruiker door naar de veilige Stripe pagina
        router.push(data.url)
      } else {
        console.error('Fout bij aanmaken checkout:', data.error)
        setLoading(false)
      }
    } catch (error) {
      console.error('Netwerkfout:', error)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="inline-flex justify-center items-center bg-purple-600 hover:bg-purple-500 text-white font-medium py-3.5 px-8 rounded-full transition-all shadow-[0_0_25px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          Processing...
        </span>
      ) : (
        `Purchase Now - €${price}`
      )}
    </button>
  )
}