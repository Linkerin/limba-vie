import { ARTICLES } from '@/app/_lib/constants';
import ListItem from '@/app/_components/ListItem/ListItem';
import ListItemLink from '@/app/_components/ListItemLink/ListItemLink';

import styles from './TipsPage.module.css';

function TipsPage() {
  return (
    <ol className={styles.list}>
      {Object.values(ARTICLES).map(val => (
        <ListItem key={val.link}>
          <ListItemLink
            aria-label={`To ${val.title} grammar article`}
            href={`/tips/grammar/${val.link}`}
          >
            {val.title}
          </ListItemLink>
        </ListItem>
      ))}
    </ol>
  );
}

export default TipsPage;
