'use client';

import dynamic from 'next/dynamic';

import Button from '../../_ui/Button/Button';
import CheckSound from '../CheckInputModal/CheckSound/CheckSound';
import { getRandomValueFromArr } from '@/app/_lib/utils/utils';
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
import type { WordsArr } from '@/app/_lib/types';

const CheckInputModal = dynamic(
  () => import('../CheckInputModal/CheckInputModal'),
  { ssr: false }
);

const phrases = Object.freeze({
  success: ['Perfect!', 'Correct!', 'Great!', 'Nice job!'],
  error: ['Oh no,', 'Whoops,', 'Oh well,', 'Awww,']
});

interface CheckInputProps {
  setCurrWord: () => void;
  word: WordsArr[0];
}

function CheckInput({ setCurrWord, word }: CheckInputProps) {
  const isApplePwa = useIsApplePwa();

  const {
    input,
    originalWord,
    resultStatus,
    onChangeHandler,
    onSubmitHandler
  } = useFormHandlers({
    gender: word.gender_ro,
    plural: word.plural,
    wordId: word.id,
    wordRo: word.ro
  });

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
        <CheckInputModal onBtnClick={setCurrWord} status={resultStatus}>
          <p>
            {getRandomValueFromArr(phrases[resultStatus])}{' '}
            {resultStatus === 'success' ? 'I' : 'i'}
            t&apos;s <span className={answerStyles}>{originalWord}</span>.
          </p>
          {resultStatus === 'error' && (
            <p className={wrongInputStyles}>
              Your answer: <span>{input}</span>
            </p>
          )}
          <CheckSound status={resultStatus} audioName={word.audio_name} />
        </CheckInputModal>
      )}
    </>
  );
}

export default CheckInput;
