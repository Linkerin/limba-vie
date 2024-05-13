import type { NextRequest } from 'next/server';

import { databases, ID } from '@/app/_lib/appwrite';

export async function POST(request: NextRequest) {
  try {
    if (request.nextUrl.origin !== process.env.NEXT_PUBLIC_BASE_URL) {
      const res = new Response(null, { status: 400 });
      return res;
    }

    const data = await request.json();

    if (!data.pathname) {
      const res = new Response(null, { status: 400 });
      return res;
    }

    await databases.createDocument(
      'limba-analytics',
      'analytics',
      ID.unique(),
      {
        pathname: data.pathname,
        os: data.os ?? null,
        os_version: data.osVersion ?? null,
        engine: data.engine ?? null,
        device_type: data.deviceType ?? null,
        device_model: data.deviceModel ?? null,
        device_vendor: data.deviceVendor ?? null,
        browser: data.browser ?? null,
        browser_version: data.browserVersion ?? null,
        country: data.country ?? null,
        city: data.city ?? null,
        ip: data.ip ?? null,
        user_id: data.userId ?? null,
        bot: data.isBot ?? null
      },
      ['read("guests")']
    );

    return new Response(null, { status: 201 });
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        message: 'Error occured while recording fetch analytics to appwrite',
        error: err
      }),
      { status: 500 }
    );
  }
}
