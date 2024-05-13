import type { NextRequest } from 'next/server';

import { databases, ID } from '@/app/_lib/appwrite';

export async function POST(request: NextRequest) {
  try {
    if (request.nextUrl.origin !== process.env.NEXT_PUBLIC_BASE_URL) {
      const res = new Response(null, { status: 400 });
      return res;
    }

    const data = await request.json();

    if (!data.metricId || !data.metricName || !data.value) {
      const res = new Response(null, { status: 400 });
      return res;
    }

    await databases.createDocument(
      'limba-analytics',
      'web_vitals',
      ID.unique(),
      {
        metric_id: data.metricId,
        metric_name: data.metricName,
        navigation_type: data.navigationType ?? null,
        rating: data.rating ?? null,
        value: data.value
      },
      ['read("guests")']
    );

    return new Response(null, { status: 201 });
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        message: 'Error occured while recording web vitals to appwrite',
        error: err
      }),
      { status: 500 }
    );
  }
}
