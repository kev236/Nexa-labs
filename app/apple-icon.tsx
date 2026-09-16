import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 46 46" fill="none">
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
          <circle cx="23" cy="12" r="5" fill="#09090b" stroke="#c084fc" strokeWidth="2.5" />
          <circle cx="12" cy="34" r="4" fill="#a855f7" />
          <circle cx="34" cy="34" r="4" fill="#a855f7" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
