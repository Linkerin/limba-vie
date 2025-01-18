/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

import { OG_PARAMS } from '@/app/_lib/constants';

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
          justifyContent: 'space-between',
          background: OG_PARAMS.colors.bg,
          color: OG_PARAMS.colors.text,
          height: '100%',
          padding: OG_PARAMS.canvas.padding,
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: OG_PARAMS.logo.fontSize,
            width: '100%'
          }}
        >
          Limba
          <img
            src={OG_PARAMS.logo.src}
            alt={OG_PARAMS.logo.alt}
            height={OG_PARAMS.logo.height}
            width={OG_PARAMS.logo.width}
          />
          Vie
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: 92,
            lineHeight: '92px',
            padding: '2.5rem',
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
      height: OG_PARAMS.canvas.height,
      width: OG_PARAMS.canvas.width,
      fonts: [
        {
          name: 'Alata',
          data: await alata,
          style: 'normal',
          weight: 400
        }
      ],
      headers: {
        'cache-control': OG_PARAMS.cacheControl
      }
    }
  );
}
