/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { getArticle, getWordsImageUrl } from '../../../_lib/utils';
import supabase from '../../../_lib/supabase';

export const runtime = 'edge';

const bgColors = {
  m: '#482ba1',
  f: '#c03043',
  n: '#e0a100'
};

const size = 1440;

export async function GET(request: NextRequest) {
  const alata = fetch(new URL('@/public/Alata.ttf', import.meta.url)).then(
    res => res.arrayBuffer()
  );

  const searchParams = request.nextUrl.searchParams;
  const word = searchParams.get('word');

  if (!word) {
    const res = new Response(null, { status: 400 });
    return res;
  }

  const { data, error } = await supabase
    .from('words')
    .select('en, ro, gender_ro, plural, img_name')
    .eq('en', decodeURIComponent(word));
  if (error) throw error;

  const wordObj = data[0];

  if (!wordObj) {
    const res = new Response(null, { status: 404 });
    return res;
  }

  const gender = wordObj.gender_ro;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: gender ? bgColors[gender] : '#6f6e91',
          width: '100%',
          height: '100%',
          paddingTop: '64px'
        }}
      >
        <img
          src={getWordsImageUrl(wordObj.img_name, 1024)}
          alt={`${wordObj.en} image`}
          height="928px"
          width="928px"
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
            {!wordObj.plural && gender && gender.length > 0
              ? getArticle(gender) + ' '
              : null}
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
            backgroundColor: '#dfd9f2',
            borderRadius: '16px',
            fontSize: '30px',
            lineHeight: '1.125em',
            padding: '14px'
          }}
        >
          <p
            style={{
              color: '#4d3399',
              borderBottom: '4px solid #e29b36',
              margin: 0
            }}
          >
            Limba
          </p>
          <p style={{ color: '#ce0930', margin: 0 }}>Vie</p>
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
      ]
    }
  );
}
