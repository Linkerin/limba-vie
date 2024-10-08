import { css } from '@/styled-system/css';

import RingSpinner from '../../../_ui/RingSpinner/RingSpinner';

const styles = css({
  color: 'primary',
  marginBlock: 'auto',

  '& > span': {
    fontSize: '4xl'
  }
});

function SentenceLoading() {
  return (
    <div className={styles}>
      <RingSpinner />
    </div>
  );
}

export default SentenceLoading;
