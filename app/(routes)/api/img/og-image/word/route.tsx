/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import type { Gender } from '@/app/_lib/types';
import { GENDER_COLORS, OG_PARAMS } from '@/app/_lib/constants';
import { getArticle, getImageUrl } from '@/app/_lib/utils/utils';

export const runtime = 'edge';

const imgSize = 350;

export async function GET(request: NextRequest) {
  const alata = fetch(new URL('@/public/Alata.ttf', import.meta.url)).then(
    res => res.arrayBuffer()
  );

  const searchParams = request.nextUrl.searchParams;
  const ro = decodeURIComponent(searchParams.get('ro') ?? '');
  const en = decodeURIComponent(searchParams.get('en') ?? '');
  const img = searchParams.get('img');
  const imgSrc = getImageUrl(img, imgSize).src;
  const gender = searchParams.get('gender') as Gender;
  const plural = searchParams.get('plural') === 'true' ? true : false;

  if (!ro || !en || !img) {
    const res = new Response('Invalid query parameters', { status: 400 });
    return res;
  }

  const article = getArticle(gender, plural);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: OG_PARAMS.colors.bg,
          padding: 60,
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            color: OG_PARAMS.colors.text,
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
            flexDirection: 'row',
            alignItems: 'center',
            // gap: '0.75rem',
            width: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '0.5rem',
              color: OG_PARAMS.colors.text,
              fontSize: '5rem',
              margin: 'auto'
            }}
          >
            <p
              style={{
                margin: 0,
                maxWidth: `${OG_PARAMS.canvas.width - imgSize - OG_PARAMS.canvas.padding * 2}px`,
                overflowWrap: 'break-word',
                textAlign: 'center',
                padding: '0 0.25rem'
              }}
            >
              {article ? article + ' ' : null}
              {ro}
            </p>
            <p style={{ margin: 0, fontSize: '0.75em', fontStyle: 'italic' }}>
              ({en})
            </p>
          </div>
          <img
            alt={`'${en}' word image`}
            src={imgSrc}
            height={imgSize}
            width={imgSize}
            style={{
              borderRadius: '16px',
              border: `10px solid ${gender ? GENDER_COLORS[gender] : 'transparent'}`
            }}
          />
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
      ]
    }
  );
}
