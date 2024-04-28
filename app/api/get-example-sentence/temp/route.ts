import type { NextRequest } from 'next/server';

import supabase from '@/app/_lib/supabase';

export const runtime = 'edge';
export const preferredRegion = ['iad1', 'hnd1'];

export async function GET(req: NextRequest) {
  if (
    req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response(null, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .is('example_ro', null)
      .limit(1);
    if (error) throw error;

    const record = data[0];

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

    return new Response(
      JSON.stringify({
        message: `Word ID ${record.id} ${record.en} was updated`,
        res: 'SUCCESS'
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to update the record', res: 'FAILED' }),
      { status: 500 }
    );
  }
}
