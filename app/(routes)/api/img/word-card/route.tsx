/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { GENDER_COLORS, OG_PARAMS } from '@/app/_lib/constants';
import { getArticle, getImageUrl } from '@/app/_lib/utils/utils';
import { getWordByEn } from '@/app/_services/supabase/dbFetchers';

export const runtime = 'edge';

const size = 1440;
const imgSizePx = 928;

export async function GET(request: NextRequest) {
  const alata = fetch(new URL('@/public/Alata.ttf', import.meta.url)).then(
    res => res.arrayBuffer()
  );

  const searchParams = request.nextUrl.searchParams;
  const word = searchParams.get('word');

  if (!word) {
    const res = new Response('Invalid query parameters', { status: 400 });
    return res;
  }

  const wordObj = await getWordByEn(decodeURIComponent(word));

  if (!wordObj) {
    const res = new Response(null, { status: 404 });
    return res;
  }

  const gender = wordObj.gender_ro;
  const article = getArticle(gender, wordObj.plural);
  const imgSrc = getImageUrl(wordObj.img_name, imgSizePx).src;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: gender ? GENDER_COLORS[gender] : '#6f6e91',
          width: '100%',
          height: '100%',
          paddingTop: '64px'
        }}
      >
        <img
          src={imgSrc}
          alt={`${wordObj.en} image`}
          height={`${imgSizePx}px`}
          width={`${imgSizePx}px`}
          style={{
            borderRadius: '64px',
            marginBottom: '32px'
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fcfcfd',
            fontSize: '64px',
            lineHeight: '1em',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              margin: '0 0 16px',
              fontSize: '1.875em',
              maxWidth: '92%'
            }}
          >
            {article ? article + ' ' : null}
            {wordObj.ro}
          </p>
          <p style={{ margin: 0 }}>{wordObj.en}</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '50px',
            right: '50px',
            backgroundColor: 'hsl(28, 33%, 97%)',
            borderRadius: '12px',
            padding: '8px'
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`}
            alt="Taur head logo"
            height={96}
            width={96}
          />
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
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
