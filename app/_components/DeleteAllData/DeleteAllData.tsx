'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../_ui/Button/Button';
import { deleteAllData } from './deleteDataUtils';
import Modal from '../_ui/Modal/Modal';

import {
  btnStyles,
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
  }, []);

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
      <Button
        css={btnStyles}
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
        <h2 className={headingStyles}>Attention!</h2>
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
