import type { WordsCount } from '../../SetsList/SetsList';

import styles from './SetItemWordsNum.module.css';

function SetItemWordsNum({
  wordsNum
}: {
  wordsNum: WordsCount['words'][0]['count'];
}) {
  return (
    <span className={styles['words-number']}>
      {wordsNum} word{wordsNum !== 1 ? 's' : null}
    </span>
  );
}

export default SetItemWordsNum;
