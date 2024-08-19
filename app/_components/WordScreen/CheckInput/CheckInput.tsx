'use client';

import dynamic from 'next/dynamic';

import Button from '../../_ui/Button/Button';
import { getRandomValueFromArr } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';
import useFormHandlers from './useFormHandlers';
import useIsApplePwa from '@/app/_hooks/useIsApplePwa';
import useWordHandlers from '@/app/_hooks/useWordHandlers';

import {
  answerStyles,
  btnStyles,
  formStyles,
  inputStyles,
  labelStyles,
  wrongInputStyles
} from './CheckInput.styles';

const CheckInputModal = dynamic(
  () => import('../CheckInputModal/CheckInputModal'),
  { ssr: false }
);

const phrases = {
  success: ['Perfect!', 'Correct!', 'Great!', 'Nice job!'],
  error: ['Oh no,', 'Whoops,', 'Oh well,', 'Awww,']
};

interface CheckInputProps {
  gender: Tables<'words'>['gender_ro'];
  plural: Tables<'words'>['plural'];
  setCurrWord: () => void;
  wordId: Tables<'words'>['id'];
  wordRo: Tables<'words'>['ro'];
}

function CheckInput({
  gender,
  plural,
  setCurrWord,
  wordId,
  wordRo
}: CheckInputProps) {
  const isApplePwa = useIsApplePwa();

  const { learnedHandler, repeatHandler } = useWordHandlers({
    wordId
  });

  const {
    input,
    originalWord,
    resultStatus,
    onChangeHandler,
    onSubmitHandler
  } = useFormHandlers({
    gender,
    plural,
    wordRo,
    repeatHandler,
    learnedHandler
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
            onChange={onChangeHandler}
            title="Type the word in Romanian"
            value={input}
            required
          />
        </label>
        <Button css={btnStyles} disabled={input.length === 0 || !!resultStatus}>
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
        </CheckInputModal>
      )}
    </>
  );
}

export default CheckInput;
