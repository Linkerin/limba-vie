/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const alata = fetch(new URL('@/public/Alata.ttf', import.meta.url)).then(
    res => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: '#212121',
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontSize: 92,
            height: '50%',
            paddingLeft: 100,
            width: '100%'
          }}
        >
          <span style={{ color: '#3972C6' }}>Limba</span>
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/bour.svg`}
            alt="Limba Vie bour head"
            height="150"
            width="150"
          />
          <span style={{ color: '#C6394B' }}>Vie</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#F0EEF7',
            fontSize: 80,
            lineHeight: '80px',
            height: '50%',
            paddingRight: 100,
            width: '100%'
          }}
        >
          <span>
            Learn{' '}
            <span style={{ marginLeft: '0.375em', color: '#3972C6' }}>Ro</span>
            <span style={{ color: '#F2BD0D' }}>man</span>
            <span style={{ color: '#C6394B' }}>ian</span>
          </span>
          <span>words with us</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Alata',
          data: await alata,
          style: 'normal',
          weight: 400
        }
      ]
    }
  );
}
