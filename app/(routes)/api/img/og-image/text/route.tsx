/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { OG_PARAMS } from '@/app/_lib/constants';

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
            alignItems: 'flex-start',
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
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3d418f',
            fontSize: 76,
            lineHeight: '80px',
            margin: 'auto',
            overflowWrap: 'break-word',
            width: '100%'
          }}
        >
          <p>{text}</p>
        </div>
      </div>
    ),
    {
      width: OG_PARAMS.canvas.width,
      height: OG_PARAMS.canvas.height,
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
