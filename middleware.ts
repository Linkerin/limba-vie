import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_LIMBA_API_URL;
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  if (!pathname || !apiUrl) return response;

  const userId = request.cookies.get('x-user-id')?.value;
  const { browser, device, engine, os, isBot } = userAgent(request);

  const body = {
    os: os.name,
    osVersion: os.version,
    engine: engine.name,
    engineVersion: engine.version,
    deviceType: device.type,
    deviceModel: device.model,
    deviceVendor: device.vendor,
    browser: browser.name,
    browserVersion: browser.version,
    country: request.geo?.country,
    city: request.geo?.city,
    ip: request.ip,
    pathname,
    userId,
    isBot
  };

  fetch(`${process.env.NEXT_PUBLIC_LIMBA_API_URL}/analytics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return response;
}

export const config = {
  matcher:
    '/((?!_next)(?!manifest.webmanifest)(?!taur.svg)(?!favicon.ico)(?!sw.js)(?!favicons/).*)'
};
