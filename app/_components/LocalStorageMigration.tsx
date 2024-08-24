'use client';

import { useEffect } from 'react';

import db from '../_lib/db';
import ssrLocalStorage from '../_services/SsrLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../_lib/constants';

function LocalStorageMigration() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loader = async () => {
      try {
        const localStorageCompletedSets = ssrLocalStorage.getItem(
          LOCAL_STORAGE_KEYS.completedSets
        );

        if (!localStorageCompletedSets) return;

        const count = await db.completedSets.count();
        if (count) return;

        const setsArr = JSON.parse(localStorageCompletedSets) as number[];
        const now = new Date();

        const itemsToAdd = setsArr.map(setId => ({
          setId,
          completedAt: now.toISOString()
        }));

        const lastRecordId = await db.completedSets.bulkAdd(itemsToAdd);
        if (typeof lastRecordId === 'number') {
          console.log('Finished migration of completed sets');
        }
      } catch (err) {
        console.error(err);
      }
    };

    loader();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loader = async () => {
      try {
        const localStorageRepeatWords = ssrLocalStorage.getItem(
          LOCAL_STORAGE_KEYS.repeatWords
        );

        if (!localStorageRepeatWords) return;

        const count = await db.wordsForRepeat.count();
        if (count) return;

        const repeatWordsObj = JSON.parse(localStorageRepeatWords) as Record<
          string,
          number
        >;
        const now = new Date();

        const itemsToAdd = Object.entries(repeatWordsObj).map(record => ({
          wordId: parseInt(record[0]),
          repeatTimes: record[1],
          addedAt: now.toISOString()
        }));

        const lastRecordId = await db.wordsForRepeat.bulkAdd(itemsToAdd);
        if (typeof lastRecordId === 'number') {
          console.log('Finished migration of words for repeat');
        }
      } catch (err) {
        console.error(err);
      }
    };

    loader();
  }, []);

  return null;
}

export default LocalStorageMigration;
