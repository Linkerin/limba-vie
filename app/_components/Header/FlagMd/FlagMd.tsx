import styles from './FlagMd.module.css';
import coatOfArmsMd from '@/public/icons/moldova_coat_of_arms.svg';

function FlagMd() {
  return (
    <div className={styles.flag}>
      <div className={styles['md-blue']} />
      <div className={styles['md-yellow']}>
        <svg aria-hidden={true} role="presentation">
          <use href={`${coatOfArmsMd.src}#md-coat`} />
        </svg>
      </div>
      <div className={styles['md-red']} />
    </div>
  );
}

export default FlagMd;
