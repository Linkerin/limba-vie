import { Ratelimit } from '@upstash/ratelimit';

import {
  LOCAL_STORAGE_KEYS,
  REPORT_SENDING_COOLDOWN_SEC
} from '@/app/_lib/constants';
import redis from './redis';
import ssrLocalStorage from '../SsrLocalStorage';

/**
 * Checks if posting is allowed for the current user based on a rate limit.
 *
 * @returns An object with `allowed` (boolean) and `message` (string) properties
 * indicating whether posting is allowed and a message to display to the user.
 */
async function isPostingAllowed() {
  const userId = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.userId) ?? 'anon';

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.tokenBucket(5, `${REPORT_SENDING_COOLDOWN_SEC} s`, 50),
    analytics: true
  });
  const { success, reset } = await ratelimit.limit(userId);

  if (!success) {
    const timeLeft = Math.floor((reset - Date.now()) / 1000);
    return {
      allowed: false,
      message: `Too many. Try again in ${timeLeft} seconds`
    };
  }

  return { allowed: true, message: 'Posting allowed' };
}

export default isPostingAllowed;
