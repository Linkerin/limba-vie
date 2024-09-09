/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import type { Gender } from '@/app/_lib/types';
import { getArticle, getImageUrl } from '@/app/_lib/utils';

export const runtime = 'edge';

const imgSize = 395;

export async function GET(request: NextRequest) {
  const alata = fetch(new URL('@/public/Alata.ttf', import.meta.url)).then(
    res => res.arrayBuffer()
  );

  const searchParams = request.nextUrl.searchParams;
  const ro = decodeURIComponent(searchParams.get('ro') ?? '');
  const en = decodeURIComponent(searchParams.get('en') ?? '');
  const img = searchParams.get('img');
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
          justifyContent: 'flex-start',
          background: '#212121',
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
            fontSize: 52,
            marginBottom: 40,
            width: '100%'
          }}
        >
          <span style={{ color: '#3972C6' }}>Limba</span>
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/bour.svg`}
            alt="Limba Vie bour head"
            height="75"
            width="75"
          />
          <span style={{ color: '#C6394B' }}>Vie</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              color: '#fcfcfd',
              fontSize: '6rem',
              margin: 'auto'
            }}
          >
            <p
              style={{
                margin: '0 0 0.5rem',
                maxWidth: '90%',
                overflowWrap: 'break-word',
                textAlign: 'center'
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
            src={getImageUrl(img, imgSize)}
            height={imgSize}
            width={imgSize}
            style={{ borderRadius: '32px' }}
          />
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
