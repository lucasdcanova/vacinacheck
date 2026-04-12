import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Saúde Livre Vacinas - Clínica de Vacinação em Florianópolis Centro'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #15335e 0%, #17497e 50%, #0072a2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #6de0e4 0%, #0072a2 50%, #0b4780 100%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            Saúde Livre
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#6de0e4',
              fontWeight: '600',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Clínica de Vacinação
          </div>
          <div
            style={{
              width: '80px',
              height: '3px',
              background: '#6de0e4',
              borderRadius: '2px',
              marginTop: '8px',
              marginBottom: '8px',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: '400',
            }}
          >
            Florianópolis Centro
          </div>
          <div
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.5)',
              marginTop: '16px',
            }}
          >
            saudelivrefloripa.com.br
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #6de0e4 0%, #0072a2 50%, #0b4780 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
