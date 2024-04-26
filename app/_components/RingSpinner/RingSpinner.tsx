import classNames from 'classnames';

import styles from './RingSpinner.module.css';

function RingSpinner({
  className,
  ...props
}: React.ComponentPropsWithRef<'span'>) {
  return (
    <span
      className={classNames(styles['ring-spinner'], className)}
      role="status"
      {...props}
    >
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export default RingSpinner;
