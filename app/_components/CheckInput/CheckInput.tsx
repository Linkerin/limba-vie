'use client';

import { useCallback, useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import Button from '../Button/Button';
import { DeviceContext } from '@/app/_contexts/DeviceProvider';
import {
  getArticle,
  getRandomValueFromArr,
  normalizeWord
} from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';
import useWordHandlers from '@/app/_hooks/useWordHandlers';

import styles from './CheckInput.module.css';

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
  const [input, setInput] = useState('');
  const [resultStatus, setResultStatus] = useState<null | 'error' | 'success'>(
    null
  );

  const { isApplePwa } = useContext(DeviceContext);

  const { learnedHandler, repeatHandler } = useWordHandlers({
    wordId
  });

  const answer = useMemo(() => {
    const normalizedWord = normalizeWord(wordRo);
    const article = getArticle(gender, plural);

    const normalizedWithArticle = article
      ? `${article} ${normalizedWord}`
      : null;
    const originalWithArticle = article ? `${article} ${wordRo}` : wordRo;

    const result = {
      word: normalizedWord,
      withArticle: normalizedWithArticle,
      original: originalWithArticle
    };

    return result;
  }, [wordRo, gender, plural]);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(e => {
      const { value } = e.currentTarget;

      setInput(value);
    }, []);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();

      const normalizedInput = normalizeWord(input);

      if (
        normalizedInput === answer.word ||
        normalizedInput === answer.withArticle
      ) {
        setResultStatus('success');
        learnedHandler();
        return;
      }

      setResultStatus('error');
      repeatHandler();

      return;
    },
    [answer, input, learnedHandler, repeatHandler]
  );

  return (
    <>
      <form
        className={classNames(styles.form, {
          [styles['apple-pwa']]: isApplePwa
        })}
        onSubmit={onSubmitHandler}
      >
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
        <Button disabled={input.length === 0 || !!resultStatus}>Check</Button>
      </form>
      {resultStatus && (
        <CheckInputModal onBtnClick={setCurrWord} status={resultStatus}>
          <p>
            {getRandomValueFromArr(phrases[resultStatus])}{' '}
            {resultStatus === 'success' ? 'I' : 'i'}
            t&apos;s <span className={styles.answer}>{answer.original}</span>.
          </p>
        </CheckInputModal>
      )}
    </>
  );
}

export default CheckInput;
