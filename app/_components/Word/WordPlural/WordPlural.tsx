import { css } from '@/styled-system/css';

import type { Tables } from '@/app/_lib/supabase.types';

const styles = css({
  fontSize: 'sm',
  marginBlockStart: 'token(spacing.1, 0.25rem)',
  width: '90%',

  '& > span': {
    color: 'main.lower',
    fontStyle: 'italic'
  }
});

function WordPlural({ plural }: { plural: Tables<'words'>['ro_plural'] }) {
  return plural ? (
    <p className={styles}>
      <span>pl.:</span> {plural}
    </p>
  ) : null;
}

export default WordPlural;
