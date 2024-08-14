'use client';

import { useEffect, useRef } from 'react';
import { css } from '@/styled-system/css';
import { IconX } from '@tabler/icons-react';
import type { SystemStyleObject } from '@/styled-system/types';

import Button from '../Button/Button';
import { cardStyles, closeBtnStyles, containerStyles } from './Modal.styles';
import Portal from '../Portal/Portal';

interface SetItemPopoverProps {
  children: React.ReactNode;
  cardCss?: SystemStyleObject;
  closeHandler?: () => void;
  containerCss?: SystemStyleObject;
  showCloseBtn?: boolean;
}

function Modal({
  children,
  closeHandler,
  cardCss = {},
  containerCss = {},
  showCloseBtn = true
}: SetItemPopoverProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleOutClick = (e: MouseEvent | TouchEvent) => {
      if (e.target instanceof Element && modalRef.current?.contains(e.target))
        return;

      closeHandler && closeHandler();
    };

    document.addEventListener('mousedown', handleOutClick);

    return () => {
      document.removeEventListener('mousedown', handleOutClick);
    };
  }, [closeHandler]);

  return (
    <Portal>
      <dialog className={css(containerStyles, containerCss)}>
        <div ref={modalRef} className={css(cardStyles, cardCss)}>
          {showCloseBtn && (
            <Button
              className={closeBtnStyles}
              aria-label="Close modal"
              onClick={closeHandler}
            >
              <IconX />
            </Button>
          )}
          {children}
        </div>
      </dialog>
    </Portal>
  );
}

export default Modal;
