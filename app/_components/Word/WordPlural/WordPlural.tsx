import { css } from '@/styled-system/css';

import type { Tables } from '@/app/_lib/supabase.types';

const styles = css({
  animation: 'fadeIn',
  fontSize: 'lg',
  marginBlock: 'token(spacing.2, 0.5rem)',
  width: '90%',

  '& > span': {
    color: 'main.lower',
    fontSize: 'xs',
    fontStyle: 'italic'
  }
});

function WordPlural({ plural }: { plural: Tables<'words'>['ro_plural'] }) {
  return plural ? (
    <p className={styles} lang="ro-RO">
      <span>plural:</span> {plural}
    </p>
  ) : null;
}

export default WordPlural;
