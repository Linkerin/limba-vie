'use client';

import { useReportWebVitals } from 'next/web-vitals';

function WebVitals() {
  useReportWebVitals(metric => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'PROD') return null;

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/web-vitals`;
    const body = JSON.stringify({
      metricId: metric.id,
      metricName: metric.name,
      navigationType: metric.navigationType,
      rating: metric.rating,
      value: metric.value
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
