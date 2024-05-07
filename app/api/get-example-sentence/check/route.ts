import type { NextRequest } from 'next/server';
import { captureException } from '@sentry/nextjs';

import supabase from '@/app/_lib/supabase';

export const runtime = 'edge';
export const preferredRegion = ['iad1', 'hnd1'];

export async function GET(req: NextRequest) {
  if (
    req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .is('example_ro', null);
    if (error) throw error;

    if (data.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'All the words have example sentences',
          res: 'SUCCESS'
        }),
        { status: 200 }
      );
    }

    for (const record of data) {
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

    const ids = data.map(record => record.id);

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
