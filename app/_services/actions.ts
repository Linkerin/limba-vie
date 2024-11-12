'use server';

import { headers, cookies } from 'next/headers';

import { insertUserReport } from './supabase/dbFetchers';
import isPostingAllowed from './redis/isPostingAllowed';
import { isUserReportRecord } from './supabase/validators';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from './SsrLocalStorage';

export async function getUserInfoFromReq() {
  const cookiesStore = cookies();
  const headersList = headers();

  const city = headersList.get('x-vercel-ip-city');
  const country = headersList.get('x-vercel-ip-country');
  const ip = headersList.get('X-Forwarded-For');
  const userAgent = headersList.get('user-agent');
  const userId = cookiesStore.get('x-user-id')?.value;

  return { country, city, ip, userAgent, userId };
}

interface RecordUserReportState {
  status: 'success' | 'error' | 'idle';
  message: string;
}
export async function recordUserReport(
  prevState: { message: string },
  formData: FormData
): Promise<RecordUserReportState> {
  const recordObj: Record<string, any> = {
    type: formData.get('type'),
    comment: formData.get('comment'),
    word_id: formData.get('word_id') ? Number(formData.get('word_id')) : null,
    grammar_article: formData.get('grammar_article') ?? null
  };

  if (!recordObj.type) {
    return { status: 'error', message: 'Select a problem type' };
  }
  const userId = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.userId) ?? 'anon';
  if (userId !== 'anon' && userId.length > 0) {
    recordObj.user_id = userId;
  }

  if (!isUserReportRecord(recordObj)) {
    return { status: 'error', message: 'Invalid report type' };
  }

  const { allowed, message } = await isPostingAllowed(userId);
  if (!allowed) {
    return { status: 'error', message };
  }

  const { error } = await insertUserReport(recordObj);
  if (error) {
    return {
      status: 'error',
      message: 'Internal error. The report was not sent.'
    };
  }

  return { status: 'success', message: 'Your report was sent!' };
}
