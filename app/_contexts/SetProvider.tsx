'use client';

import { createContext, useMemo, useState } from 'react';

import type {
  RepeatWords,
  SetWords
} from '@/app/_services/supabase/dbFetchers';
import { shuffleArr } from '@/app/_lib/utils/utils';

interface SetProviderProps {
  children: React.ReactNode;
  words: SetWords | RepeatWords;
}

export interface SetContextValue {
  currWordIndex: number;
  mistakesMade: number;
  mistakesCorrected: number;
  started: Date;
  words: SetWords | RepeatWords;
}

const defaultContextValue: SetContextValue = {
  currWordIndex: 0,
  mistakesMade: 0,
  mistakesCorrected: 0,
  started: new Date(),
  words: []
};

export const SetContext = createContext<SetContextValue>(defaultContextValue);
export const SetContextSetter = createContext<
  React.Dispatch<React.SetStateAction<SetContextValue>>
>(() => {});

export default function SetProvider({ children, words }: SetProviderProps) {
  const shuffledWords = useMemo(() => shuffleArr(words), [words]);

  const [state, setState] = useState<SetContextValue>({
    currWordIndex: 0,
    mistakesCorrected: 0,
    mistakesMade: 0,
    started: new Date(),
    words: shuffledWords
  });

  return (
    <SetContext.Provider value={state}>
      <SetContextSetter.Provider value={setState}>
        {children}
      </SetContextSetter.Provider>
    </SetContext.Provider>
  );
}
