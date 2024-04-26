'use client';

import classNames from 'classnames';

import ActionBtn from '../../ActionBtn/ActionBtn';
import RingSpinner from '../../RingSpinner/RingSpinner';
import useActionHandlers, { ActionsProps } from './useActionHandlers';

import styles from './Actions.module.css';

function Actions({ setCurrWord, wordId, wordRo }: ActionsProps) {
  const {
    examplesState,
    sentences,
    exampleClickhandler,
    learnedСlickHandler,
    repeatClickHandler
  } = useActionHandlers({ setCurrWord, wordId, wordRo });

  return (
    <div className={styles.actions}>
      {examplesState !== null && (
        <div
          className={classNames(styles['example-container'], styles.test, {
            [styles.error]: examplesState === 'error'
          })}
        >
          {examplesState === 'loaded' && (
            <>
              <p className={styles.ro}>{sentences.ro}</p>
              <p className={styles.en}>{sentences.en}</p>
            </>
          )}
          {examplesState === 'loading' && (
            <div className={styles.spinner}>
              <RingSpinner />
            </div>
          )}
          {examplesState === 'error' && (
            <>
              <p>Our AI got tired 😔</p>
              <p>Please, try again later</p>
            </>
          )}
        </div>
      )}
      <div className={styles['action-btns']}>
        <ActionBtn variant="repeat" onClick={repeatClickHandler} />
        <ActionBtn variant="example" onClick={exampleClickhandler} />
        <ActionBtn variant="learned" onClick={learnedСlickHandler} />
      </div>
    </div>
  );
}

export default Actions;
