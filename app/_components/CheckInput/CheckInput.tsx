'use client';

import { useCallback, useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { DeviceContext } from '@/app/_contexts/DeviceProvider';
import { getArticle } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';
import Button from '../Button/Button';

import styles from './CheckInput.module.css';
import classNames from 'classnames';

const CheckInputModal = dynamic(
  () => import('../CheckInputModal/CheckInputModal'),
  { ssr: false }
);

const normalizeWord = (word: string) => {
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

interface CheckInputProps {
  gender: Tables<'words'>['gender_ro'];
  plural: Tables<'words'>['plural'];
  setCurrWord: () => void;
  wordRo: Tables<'words'>['ro'];
}

function CheckInput({ wordRo, gender, setCurrWord, plural }: CheckInputProps) {
  const [input, setInput] = useState('');
  const [resultStatus, setResultStatus] = useState<null | 'error' | 'success'>(
    null
  );

  const { isApplePwa } = useContext(DeviceContext);

  const resultMsgs = useMemo(() => {
    return {
      success: `Correct! It's "${wordRo}"`,
      error: `Oh no, it was "${wordRo}"`
    };
  }, [wordRo]);

  const answer = useMemo(() => {
    const article =
      !plural && gender && gender.length > 0 ? getArticle(gender) + ' ' : null;
    const normalizedWord = normalizeWord(wordRo);

    const result = article ? article + normalizedWord : normalizedWord;

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

      if (answer.includes(normalizedInput)) {
        setResultStatus('success');
        return;
      }

      setResultStatus('error');
    },
    [answer, input]
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
          title="Type the word in Romanian"
          value={input}
          minLength={1}
          onChange={onChangeHandler}
          disabled={!!resultStatus}
          required
        />
        <Button disabled={input.length === 0}>Check</Button>
      </form>
      {resultStatus && (
        <CheckInputModal
          onBtnClick={setCurrWord}
          message={resultMsgs[resultStatus]}
          status={resultStatus}
        />
      )}
    </>
  );
}

export default CheckInput;
