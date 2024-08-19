'use server';

import { headers, cookies } from 'next/headers';
import supabase from '../_lib/supabase';
import { Tables } from '../_lib/supabase.types';

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

export async function getUnitSets(unitId: Tables<'units_view'>['id']) {
  if (!unitId) throw new Error('Unit id was not provided to fetch sets');

  const { data, error } = await supabase
    .from('sets_view')
    .select('id, set, emoji, order, words_count')
    .eq('unit_id', unitId)
    .order('order');
  if (error) throw error;

  return data;
}

export async function getPrevUnitId(unitId: Tables<'units_view'>['id']) {
  if (!unitId) return null;

  const { data, error } = await supabase
    .from('units_view')
    .select('prev_unit')
    .eq('id', unitId);
  if (error) throw error;

  return data.at(0)?.prev_unit;
}

export type UnitSets = Awaited<ReturnType<typeof getUnitSets>>;
