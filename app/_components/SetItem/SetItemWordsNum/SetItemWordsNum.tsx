import styles from './SetItemWordsNum.module.css';

function SetItemWordsNum({ wordsNum }: { wordsNum: number | null }) {
  return wordsNum === null ? null : (
    <span className={styles['words-number']}>
      {wordsNum} word{wordsNum !== 1 ? 's' : null}
    </span>
  );
}

export default SetItemWordsNum;
