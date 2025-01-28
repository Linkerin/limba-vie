import { css } from '@/styled-system/css';

export const containerStyles = css.raw({
  animation: 'flipIn 0.4s ease-in',
  maxWidth: '80dvw'
});

export const formStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.3, 0.75rem)'
});

export const btnStyles = css.raw({
  marginBlockStart: 'token(spacing.2, 0.5rem)'
});
