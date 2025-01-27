import { css } from '@/styled-system/css';

export const navStyles = css({
  display: 'none',

  '@media (min-width: 1280px)': {
    display: 'block'
  }
});

export const listStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'token(spacing.6, 1.5rem)',

  '& a': {
    color: 'main'
  }
});
