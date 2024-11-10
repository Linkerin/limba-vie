import type { NextRequest } from 'next/server';
import { captureException } from '@sentry/nextjs';

import { getWordsWoExamples } from '@/app/_services/supabase/dbFetchers';

export const runtime = 'edge';
export const preferredRegion = ['iad1', 'hnd1'];

export async function GET(req: NextRequest) {
  if (
    req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const words = await getWordsWoExamples();

    if (words.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'All the words have example sentences',
          res: 'SUCCESS'
        }),
        { status: 200 }
      );
    }

    console.log(words);

    for (const record of words) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append(
        'supabase-hook-secret',
        `${process.env.SUPABASE_HOOK_SECRET}`
      );

      const url = new URL(
        '/api/get-example-sentence',
        process.env.NEXT_PUBLIC_BASE_URL
      );

      const res = await fetch(url.href, {
        method: 'POST',
        body: JSON.stringify({ record }),
        headers
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
    }

    const ids = words.map(record => record.id);

    return Response.json({
      message: `The following IDs were updated: ${ids.join(', ')}`,
      res: 'SUCCESS'
    });
  } catch (err) {
    console.error(err);
    captureException(err);

    return new Response(
      JSON.stringify({ message: 'Failed to update the record', res: 'FAILED' }),
      { status: 500 }
    );
  }
}
