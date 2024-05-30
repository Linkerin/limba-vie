'use client';

import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { IconX } from '@tabler/icons-react';

import Button from '../Button/Button';
import Portal from '../Portal/Portal';

import styles from './Modal.module.css';

interface SetItemPopoverProps {
  children: React.ReactNode;
  cardClassName?: string;
  closeHandler?: () => void;
  containerClassName?: string;
  showCloseBtn?: boolean;
}

function Modal({
  children,
  closeHandler,
  cardClassName,
  containerClassName,
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
      <div className={classNames(styles.container, containerClassName)}>
        <div ref={modalRef} className={classNames(styles.card, cardClassName)}>
          {showCloseBtn && (
            <Button
              className={styles['close-btn']}
              aria-label="Close modal"
              onClick={closeHandler}
            >
              <IconX />
            </Button>
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
