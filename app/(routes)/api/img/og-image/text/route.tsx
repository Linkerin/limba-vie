/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const alata = fetch(new URL('@/public/Alata.ttf', import.meta.url)).then(
    res => res.arrayBuffer()
  );

  const searchParams = request.nextUrl.searchParams;
  const text = decodeURIComponent(searchParams.get('text') ?? '');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          background: '#212121',
          height: '100%',
          padding: 40,
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            fontSize: 92,
            marginBottom: 40,
            // height: '50%',
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
            fontSize: 76,
            lineHeight: '80px',
            paddingRight: 100,
            width: '100%'
          }}
        >
          <p>{text}</p>
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
