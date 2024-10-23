'use client';

import { useCallback, useRef, useState } from 'react';
import { IconChecks, IconExclamationCircle } from '@tabler/icons-react';

import Button from '../../../../_ui/Button/Button';
import importProgress from './importUtils/importProgress';
import Loader from '../../../../_ui/Loader/Loader';
import Modal from '../../../../_ui/Modal/Modal';

import { actionBtnStyles } from '../ProgressActions.styles';
import {
  contentStyles,
  inputStyles,
  labelStyles,
  modalBtnStyles
} from './ImportProgress.styles';

type LoadState = 'LOAD' | 'SUCCESS' | 'ERROR' | 'IDLE';

function ImportProgress() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadState, setLoadState] = useState<LoadState>('IDLE');
  const [errorMsg, setErrorMsg] = useState('');

  const changeHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const files = e.currentTarget.files;
      if (!files) return;
      if (files?.length === 0) return;

      try {
        setLoadState('LOAD');
        await importProgress(files[0]);
        setLoadState('SUCCESS');
      } catch (error) {
        setLoadState('ERROR');
        setErrorMsg((error as Error).message);
      }
    },
    []
  );

  const clickHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  }, []);

  const modalCloseHandler = useCallback(
    (_: React.MouseEvent<HTMLButtonElement>) => {
      setLoadState('IDLE');
    },
    []
  );

  return (
    <>
      <label className={labelStyles} htmlFor="progress-upload">
        Import your progress to resume where you left off.
      </label>
      <input
        ref={inputRef}
        className={inputStyles}
        id="progress-upload"
        name="progress-upload"
        type="file"
        accept=".json"
        onChange={changeHandler}
      />
      <Button css={actionBtnStyles} onClick={clickHandler} variant="primary">
        Upload progress
      </Button>

      <Modal
        closeHandler={modalCloseHandler}
        showCloseBtn={loadState === 'LOAD' ? false : true}
        state={loadState === 'IDLE' ? 'CLOSE' : 'SHOW_MODAL'}
      >
        <div className={contentStyles} data-status={loadState}>
          {loadState === 'ERROR' && (
            <>
              <IconExclamationCircle />
              <h2>Failed</h2>
              <p>
                We faced the following error: <br />{' '}
                <span id="error-msg">{errorMsg}</span>
              </p>
            </>
          )}
          {loadState === 'SUCCESS' && (
            <>
              <IconChecks />
              <h2>Success!</h2>
              <p>Your progress has been loaded</p>
            </>
          )}
          {loadState === 'LOAD' && (
            <>
              <p>Loading...</p>
              <Loader />
            </>
          )}
          {loadState !== 'LOAD' && (
            <Button
              css={modalBtnStyles}
              onClick={modalCloseHandler}
              variant={loadState === 'SUCCESS' ? 'success' : 'secondary'}
              autoFocus
            >
              Continue
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ImportProgress;
