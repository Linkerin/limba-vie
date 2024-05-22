import classNames from 'classnames';

import styles from './ListItem.module.css';

interface ListItemProps extends React.ComponentPropsWithRef<'li'> {
  animation?: boolean;
}

function ListItem({
  children,
  className,
  animation = true,
  ...props
}: ListItemProps) {
  return (
    <li
      className={classNames(
        styles.section,
        { [styles.animation]: animation },
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}

export default ListItem;
