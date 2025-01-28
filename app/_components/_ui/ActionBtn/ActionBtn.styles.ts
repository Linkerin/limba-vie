import { css } from '@/styled-system/css';

export const btnStyles = css.raw({
  padding: 'token(spacing.2, 0.5rem)',
  '& svg': {
    fontSize: '2.875rem'
  },

  xl: {
    gap: 'token(spacing.3, 0.75rem)',
    width: '30%',

    '& svg': {
      fontSize: '1.25em'
    }
  }
});

export const labelStyles = css({
  display: 'none',

  xl: {
    display: 'inline'
  }
});
