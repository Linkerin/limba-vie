import { styles } from './Popover.styles';

export interface PopoverProps {
  children: React.ReactNode;
  positionX: 'left' | 'right';
  positionY: 'top' | 'bottom';
}

function Popover({ children, positionX, positionY }: PopoverProps) {
  return (
    <div className={styles} data-x={positionX} data-y={positionY}>
      {children}
    </div>
  );
}

export default Popover;
