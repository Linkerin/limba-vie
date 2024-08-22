import { css } from '@/styled-system/css';

export const containerStyles = css({
  animation: 'fadeIn',
  marginBlock: 'auto',
  textAlign: 'center'
});

export const imgStyles = css({
  height: 'img.size',
  marginBlock: 'token(spacing.4, 1rem)',
  marginInline: 'auto',
  width: 'auto'
});

export const msgStyles = css({
  fontSize: '2rem',
  lineHeight: '1.5em',
  marginBlockEnd: 'token(spacing.8, 2rem)'
});

export const setNameStyles = css({
  display: 'inline-block',
  backgroundColor: 'primary.container',
  borderRadius: '0.5em',
  color: 'primary',
  fontWeight: 'bold',
  paddingInline: '0.5em',
  paddingBlock: '0em 0.125em'
});

export const btnStyles = css.raw({
  fontSize: '2xl',
  marginBlockEnd: 'token(spacing.2, 0.5rem)',
  width: '100%'
});
