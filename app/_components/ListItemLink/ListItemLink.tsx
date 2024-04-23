import Link from 'next/link';
import classNames from 'classnames';

import styles from './ListItemLink.module.css';

function ListItemLink({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Link>) {
  return (
    <Link className={classNames(styles.link, className)} {...props}>
      {children}
    </Link>
  );
}

export default ListItemLink;
