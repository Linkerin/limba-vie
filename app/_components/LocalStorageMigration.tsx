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

        const now = new Date();
        const count = await db.completedSets.count();

        // Checks whether the table contains date info as strings and clears the table to rewrite
        if (count) {
          const record = (await db.completedSets.limit(1).toArray()).at(0);

          const dateVal = record?.completedAt;
          if (
            dateVal instanceof Date &&
            typeof dateVal.getDate === 'function'
          ) {
            return;
          }

          await db.completedSets.clear();
        }

        const setsArr = JSON.parse(localStorageCompletedSets) as number[];

        const itemsToAdd = setsArr.map(setId => ({
          setId,
          completedAt: now
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

        const now = new Date();
        const count = await db.wordsForRepeat.count();

        // Checks whether the table contains date info as strings and clears the table to rewrite
        if (count) {
          const record = (await db.wordsForRepeat.limit(1).toArray()).at(0);

          const dateVal = record?.addedAt;
          if (
            dateVal instanceof Date &&
            typeof dateVal.getDate === 'function'
          ) {
            return;
          }

          await db.wordsForRepeat.clear();
        }

        const repeatWordsObj = JSON.parse(localStorageRepeatWords) as Record<
          string,
          number
        >;

        const itemsToAdd = Object.entries(repeatWordsObj).map(record => ({
          wordId: parseInt(record[0]),
          repeatTimes: record[1],
          addedAt: now
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
