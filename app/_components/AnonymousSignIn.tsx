'use client';

import { useEffect } from 'react';

import { LOCAL_STORAGE_KEYS } from '../_lib/constants';
import ssrLocalStorage from '../_services/SsrLocalStorage';

const key = LOCAL_STORAGE_KEYS.userId;

const setUserCookies = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/set-user-cookies`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
};

function AnonymousSignIn() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    (async () => {
      try {
        const id = ssrLocalStorage.getItem(key);
        const supabase = (await import('@/app/_services/supabase/supabase'))
          .default;

        if (id) {
          const { error } = await supabase.auth.refreshSession();
          if (error) throw error;

          await setUserCookies(id);

          return;
        }

        const { data, error } = await supabase.auth.signInAnonymously({
          options: { data: { id } }
        });
        if (error) throw error;

        if (data.user?.id) {
          ssrLocalStorage.setItem(key, data.user.id);
          await setUserCookies(data.user.id);
        }

        return;
      } catch (err) {
        ssrLocalStorage.removeItem(key);
        throw err;
      }
    })();
  }, []);

  return null;
}

export default AnonymousSignIn;
