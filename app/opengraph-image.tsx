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
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #a855f7, #581c87)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            N
          </div>
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