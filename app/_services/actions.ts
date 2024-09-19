'use server';

import { headers, cookies } from 'next/headers';

import { isUserReportRecord } from '../_lib/utils';
import supabase from '../_lib/supabase';
import isPostingAllowed from './redis/isPostingAllowed';

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

  if (!isUserReportRecord(recordObj)) {
    return { status: 'error', message: 'Invalid report type' };
  }

  const { allowed, message } = await isPostingAllowed();
  if (!allowed) {
    return { status: 'error', message };
  }

  const { error } = await supabase.from('user_reports').insert(recordObj);
  if (error) {
    return {
      status: 'error',
      message: 'Internal error. The report was not sent.'
    };
  }

  return { status: 'success', message: 'Your report was sent!' };
}
