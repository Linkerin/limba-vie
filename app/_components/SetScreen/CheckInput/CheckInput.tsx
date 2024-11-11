'use client';

import dynamic from 'next/dynamic';

import Button from '@/app/_components/_ui/Button/Button';
import CheckSound from '../CheckInputModal/CheckSound/CheckSound';
import { getRandomValueFromArr } from '@/app/_lib/utils/utils';
import { useCurrWord } from '@/app/_hooks/useSetProvider';
import useFormHandlers from './useFormHandlers';
import useIsApplePwa from '@/app/_hooks/useIsApplePwa';

import {
  answerStyles,
  btnStyles,
  formStyles,
  inputStyles,
  labelStyles,
  wrongInputStyles
} from './CheckInput.styles';
import getAnswer from './getAnswerObj';
import { useMemo } from 'react';

const CheckInputModal = dynamic(
  () => import('../CheckInputModal/CheckInputModal'),
  { ssr: false }
);

const phrases = Object.freeze({
  success: ['Perfect!', 'Correct!', 'Great!', 'Nice job!'],
  error: ['Oh no,', 'Whoops,', 'Oh well,', 'Awww,']
});

function CheckInput() {
  const isApplePwa = useIsApplePwa();

  const {
    plural,
    id: wordId,
    ro: wordRo,
    gender_ro: gender,
    audio_name: audioName
  } = useCurrWord();

  const answer = useMemo(
    () => getAnswer({ gender, plural, wordRo }),
    [gender, plural, wordRo]
  );

  const { input, resultStatus, onChangeHandler, onSubmitHandler } =
    useFormHandlers(wordId, answer);

  return (
    <>
      <form
        className={formStyles}
        onSubmit={onSubmitHandler}
        data-apple-pwa={isApplePwa}
      >
        <label className={labelStyles} htmlFor="word-check">
          Translate into Romanian:
          <input
            className={inputStyles}
            id="word-check"
            name="word-check"
            type="text"
            autoComplete="off"
            disabled={!!resultStatus}
            lang="ro-RO"
            minLength={1}
            maxLength={256}
            onChange={onChangeHandler}
            title="Type the word in Romanian"
            value={input}
            required
          />
        </label>
        <Button
          css={btnStyles}
          variant="primary"
          disabled={input.length === 0 || !!resultStatus}
          aria-label="Check your answer"
        >
          Check
        </Button>
      </form>
      {resultStatus && (
        <CheckInputModal key={wordId} status={resultStatus}>
          <p>
            {getRandomValueFromArr(phrases[resultStatus])}{' '}
            {resultStatus === 'success' ? 'I' : 'i'}
            t&apos;s <span className={answerStyles}>{answer.original}</span>.
          </p>
          {resultStatus === 'error' && (
            <p className={wrongInputStyles}>
              Your answer: <span>{input}</span>
            </p>
          )}
          <CheckSound status={resultStatus} audioName={audioName} />
        </CheckInputModal>
      )}
    </>
  );
}

export default CheckInput;
