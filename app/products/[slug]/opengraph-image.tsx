import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
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
          <svg width="24" height="24" viewBox="0 0 46 46" fill="none">
            <line x1="12" y1="34" x2="23" y2="12" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            <line x1="23" y1="12" x2="34" y2="34" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            <line
              x1="12"
              y1="34"
              x2="34"
              y2="34"
              stroke="#a855f7"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.45"
            />
            <circle cx="23" cy="12" r="5.5" fill="#030303" stroke="#c084fc" strokeWidth="3" />
            <circle cx="12" cy="34" r="4.5" fill="#a855f7" />
            <circle cx="34" cy="34" r="4.5" fill="#a855f7" />
          </svg>
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