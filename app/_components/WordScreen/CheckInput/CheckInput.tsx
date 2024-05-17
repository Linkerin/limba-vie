'use client';

import dynamic from 'next/dynamic';
import classNames from 'classnames';

import Button from '../../_ui/Button/Button';
import { getRandomValueFromArr } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';
import useIsApplePwa from '@/app/_hooks/useIsApplePwa';
import useWordHandlers from '@/app/_hooks/useWordHandlers';

import styles from './CheckInput.module.css';
import useFormHandlers from './useFormHandlers';

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
        className={classNames(styles.form, {
          [styles['apple-pwa']]: isApplePwa
        })}
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="word-check">
          Translate into Romanian:
          <input
            className={styles.input}
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
        <Button disabled={input.length === 0 || !!resultStatus}>Check</Button>
      </form>
      {resultStatus && (
        <CheckInputModal onBtnClick={setCurrWord} status={resultStatus}>
          <p>
            {getRandomValueFromArr(phrases[resultStatus])}{' '}
            {resultStatus === 'success' ? 'I' : 'i'}
            t&apos;s <span className={styles.answer}>{originalWord}</span>.
          </p>
          {resultStatus === 'error' && (
            <p className={styles['wrong-input']}>
              Your answer: <span>{input}</span>
            </p>
          )}
        </CheckInputModal>
      )}
    </>
  );
}

export default CheckInput;
