import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nexa Labs Product'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = slug.toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#030303',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '20px',
            color: '#c084fc',
            letterSpacing: '2px',
          }}
        >
          NEXA LABS ECOSYSTEM
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#ffffff' }}>
            {title}
          </div>
          <div style={{ fontSize: '28px', color: '#9ca3af' }}>
            Autonomous Micro-Software Product
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: '18px',
            color: '#6b7280',
            borderTop: '1px solid #1f2937',
            paddingTop: '24px',
          }}
        >
          <span>nexalabs.app</span>
          <span>BUILD v0.9</span>
        </div>
      </div>
    ),
    { ...size }
  )
}