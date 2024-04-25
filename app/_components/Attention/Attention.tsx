import classNames from 'classnames';
import { IconAlertTriangle } from '@tabler/icons-react';

import styles from './Attention.module.css';

interface AttentionProps extends React.ComponentPropsWithRef<'div'> {
  heading?: string;
}

function Attention({ className, heading, children, ...props }: AttentionProps) {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      {heading?.length && heading?.length > 0 && (
        <div className={styles.heading}>
          <span>
            <IconAlertTriangle />
          </span>
          <p>{heading}</p>
        </div>
      )}
      {children}
    </div>
  );
}

export default Attention;
