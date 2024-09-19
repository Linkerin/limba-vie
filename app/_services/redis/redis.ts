import { Redis } from '@upstash/redis';
import https from 'https';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
  agent: new https.Agent({ keepAlive: true })
});

export default redis;
