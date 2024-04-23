import classNames from 'classnames';

import styles from './ListItem.module.css';

function ListItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<'li'>) {
  return (
    <li className={classNames(styles.section, className)} {...props}>
      {children}
    </li>
  );
}

export default ListItem;
