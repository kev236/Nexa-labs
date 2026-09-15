import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Nexa Labs | Premium Micro-Software Ecosystem'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030014',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 46 46" fill="none">
            <line x1="12" y1="34" x2="23" y2="12" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="23" y1="12" x2="34" y2="34" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
            <line
              x1="12"
              y1="34"
              x2="34"
              y2="34"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.45"
            />
            <circle cx="23" cy="12" r="5" fill="#030014" stroke="#c084fc" strokeWidth="2.5" />
            <circle cx="12" cy="34" r="4" fill="#a855f7" />
            <circle cx="34" cy="34" r="4" fill="#a855f7" />
          </svg>
          <span
            style={{
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 'bold',
              letterSpacing: '2px',
            }}
          >
            NEXA LABS
          </span>
        </div>

        <h1
          style={{
            fontSize: '52px',
            fontWeight: '900',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '900px',
            margin: '0 0 20px 0',
          }}
        >
          Autonomous Micro-Software Ecosystem
        </h1>

        <p
          style={{
            fontSize: '22px',
            color: '#9ca3af',
            textAlign: 'center',
            maxWidth: '700px',
            margin: 0,
          }}
        >
          High-performance tools engineered for efficiency and friction-free workflows.
        </p>
      </div>
    ),
    { ...size }
  )
}