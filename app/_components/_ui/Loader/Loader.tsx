import { css } from '@/styled-system/css';

import RingSpinner from '../RingSpinner/RingSpinner';

const styles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',

  '& *[data-element="spinner-container"]': {
    color: 'main.container.darker',
    fontSize: '5rem'
  },

  '& *[data-element="spinner-part"]': {
    borderWidth: '0.25rem'
  }
});

function Loader() {
  return (
    <section className={styles}>
      <RingSpinner />
    </section>
  );
}

export default Loader;
