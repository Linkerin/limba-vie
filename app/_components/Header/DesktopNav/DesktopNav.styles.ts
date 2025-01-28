import { css } from '@/styled-system/css';

export const navStyles = css({
  hideBelow: 'xl'
});

export const listStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'token(spacing.6, 1.5rem)',

  '& a': {
    color: 'main',
    textDecoration: 'none',
    paddingBlock: 'token(spacing.1, 0.25rem)',

    '&:hover': {
      color: 'primary.darker',
      borderBlockEnd: '2px solid token(colors.primary.darker)'
    }
  }
});
