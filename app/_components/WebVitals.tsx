'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { getUserInfoFromReq } from '../_services/actions';

function WebVitals() {
  useReportWebVitals(async metric => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'PROD') return null;

    const { city, country, ip, userAgent, userId } = await getUserInfoFromReq();
    const url = `${process.env.NEXT_PUBLIC_LIMBA_API}/web-vitals`;
    const body = JSON.stringify({
      metricId: metric.id,
      metricName: metric.name,
      navigationType: metric.navigationType,
      rating: metric.rating,
      value: metric.value,
      city,
      country,
      ip,
      userAgent,
      userId
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body
      });
    }
  });

  return null;
}

export default WebVitals;
