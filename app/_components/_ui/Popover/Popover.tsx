import classNames from 'classnames';

import styles from './Popover.module.css';

export interface PopoverProps {
  children: React.ReactNode;
  positionX: 'left' | 'right';
  positionY: 'top' | 'bottom';
}

function Popover({ children, positionX, positionY }: PopoverProps) {
  return (
    <div
      className={classNames(
        styles.popover,
        styles[positionX],
        styles[positionY]
      )}
    >
      {children}
    </div>
  );
}

export default Popover;
