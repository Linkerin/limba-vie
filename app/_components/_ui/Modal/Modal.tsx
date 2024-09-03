'use client';

import { useCallback, useEffect, useRef } from 'react';
import { css } from '@/styled-system/css';
import { IconX } from '@tabler/icons-react';
import type { SystemStyleObject } from '@/styled-system/types';

import Button from '../Button/Button';

import { closeBtnStyles, containerStyles } from './Modal.styles';

export type ModalState = 'SHOW' | 'SHOW_MODAL' | 'CLOSE';

interface SetItemPopoverProps extends React.ComponentPropsWithRef<'dialog'> {
  state: ModalState;
  css?: SystemStyleObject;
  closeHandler?: React.MouseEventHandler;
  showCloseBtn?: boolean;
  autofocusCloseBtn?: boolean;
}

const Modal = function Modal({
  children,
  closeHandler,
  state,
  css: cssProp = {},
  autofocusCloseBtn = false,
  showCloseBtn = true,
  ...props
}: SetItemPopoverProps) {
  useEffect(() => {
    switch (state) {
      case 'SHOW':
        dialogRef.current?.show();
        break;

      case 'SHOW_MODAL':
        dialogRef.current?.showModal();
        break;

      case 'CLOSE':
        dialogRef.current?.close();
        break;

      default:
        break;
    }
  }, [state]);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const defaultCloseHandler = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={css(containerStyles, cssProp)}
      {...props}
    >
      {showCloseBtn && (
        <Button
          css={closeBtnStyles}
          aria-label="Close modal"
          onClick={closeHandler ?? defaultCloseHandler}
          autoFocus={autofocusCloseBtn}
        >
          <IconX />
        </Button>
      )}
      {children}
    </dialog>
  );
};

export default Modal;
