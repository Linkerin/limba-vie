'use client';

import { useEffect } from 'react';

import { setUserCookie } from '../_services/actions';
import ssrLocalStorage from '../_services/SsrLocalStorage';

const key = 'lvUserId';

function AnonymousSignIn() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    (async () => {
      try {
        const id = ssrLocalStorage.getItem(key);
        const supabase = (await import('@/app/_lib/supabase')).default;

        if (id) {
          const { error } = await supabase.auth.refreshSession();
          if (error) throw error;

          setUserCookie(id);
          console.log('Awaited');

          return;
        }

        const { data, error } = await supabase.auth.signInAnonymously({
          options: { data: { id } }
        });
        if (error) throw error;

        if (data.user?.id) {
          ssrLocalStorage.setItem(key, data.user.id);
          setUserCookie(data.user?.id);
        }
      } catch (err) {
        console.error('Sign In error');
        throw err;
      }
    })();
  }, []);

  return null;
}

export default AnonymousSignIn;
