'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../../../../_ui/Button/Button';
import { deleteAllData } from './deleteDataUtils';
import Modal from '../../../../_ui/Modal/Modal';

import { actionBtnStyles } from '../ProgressActions.styles';
import {
  confirmationBtnStyles,
  headingStyles,
  modalStyles,
  pStyles
} from './DeleteAllData.styles';

function DeleteAllData() {
  const [delaySeconds, setDelaySeconds] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const openModalClickHandler = useCallback(() => setShowModal(true), []);
  const modalCloseHandler = useCallback(() => setShowModal(false), []);
  const confirmationClickHandler = useCallback(async () => {
    if (typeof document === 'undefined') return;

    await deleteAllData();
    router.push('/');
  }, [router]);

  useEffect(() => {
    if (!showModal) return;

    const intervalId = setInterval(
      () => setDelaySeconds(prevState => prevState - 1),
      1000
    );

    return () => {
      clearInterval(intervalId);
      setDelaySeconds(10);
    };
  }, [showModal]);

  return (
    <>
      <label htmlFor="delete-progress">
        Permanently delete all progress and settings.
        <br />
        This action is <strong>irrevocable</strong>! Be sure to have a backup
        first.
      </label>
      <Button
        id="delete-progress"
        css={actionBtnStyles}
        onClick={openModalClickHandler}
        variant="secondary"
      >
        Delete all data
      </Button>

      <Modal
        css={modalStyles}
        state={showModal ? 'SHOW_MODAL' : 'CLOSE'}
        autofocusCloseBtn={true}
        closeHandler={modalCloseHandler}
      >
        <h1 className={headingStyles}>Attention!</h1>
        <p className={pStyles}>
          Are you sure that you want to delete everything from the app? This
          action is <strong>irrevocable</strong> and will{' '}
          <strong>eliminate</strong> all your progress and settings.
        </p>
        <p>Please, think twice before clicking the confirmation button.</p>
        <Button
          css={confirmationBtnStyles}
          onClick={confirmationClickHandler}
          variant="secondary"
          disabled={delaySeconds > 0}
        >
          Delete everything{delaySeconds > 0 && ` (${delaySeconds} s)`}
        </Button>
      </Modal>
    </>
  );
}

export default DeleteAllData;
