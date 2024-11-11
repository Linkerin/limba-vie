import { useCallback, useContext } from 'react';
import { SetContext, SetContextSetter } from '../_contexts/SetProvider';

export function useCurrWord() {
  const { currWordIndex, words } = useContext(SetContext);

  return words[currWordIndex];
}

export function useIncrementMistakesMade() {
  const setter = useContext(SetContextSetter);

  const incrementMistakesMade = useCallback(() => {
    setter(prevState => ({
      ...prevState,
      mistakesMade: prevState.mistakesMade + 1
    }));
  }, [setter]);

  return incrementMistakesMade;
}

export function useIncrementMistakesCorrected() {
  const setter = useContext(SetContextSetter);

  const incrementMistakesCorrected = useCallback(() => {
    setter(prevState => ({
      ...prevState,
      mistakesCorrected: prevState.mistakesCorrected + 1
    }));
  }, [setter]);

  return incrementMistakesCorrected;
}

export function useSetNextWord() {
  const setter = useContext(SetContextSetter);

  const setNextWord = useCallback(() => {
    setter(prevState => ({
      ...prevState,
      currWordIndex: prevState.currWordIndex + 1
    }));
  }, [setter]);

  return setNextWord;
}

export function useSetState() {
  const state = useContext(SetContext);

  return state;
}
