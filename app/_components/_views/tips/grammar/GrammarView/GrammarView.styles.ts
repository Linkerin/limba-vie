import { css } from '@/styled-system/css';

export const liStyles = css({
  color: 'main',
  fontSize: '1.375rem',
  padding: 'token(spacing.4, 1rem) token(spacing.3, 0.75rem)',
  position: 'relative',
  whiteSpace: 'nowrap',
  width: ' 100%',
  zIndex: 0,

  '&:not(:last-of-type)': {
    marginBlockEnd: 'token(spacing.3, 0.75rem)'
  }
});

export const linkStyles = css({
  lineHeight: '1.25em',
  textDecoration: 'none',
  userSelect: 'none',
  whiteSpace: 'normal',

  '&, &:visited': {
    color: 'main'
  }
});
