import { css } from '@/styled-system/css';

export const audioBtnStyles = css.raw({
  fontSize: '4xl',
  animation: 'appearance 7s ease-in'
});

export const sectionStyles = css({
  animation: 'fadeIn',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 'token(spacing.1, 0.25rem)',
  height: '100%',

  '& > p:first-of-type': {
    alignSelf: 'flex-end'
  }
});

export const wordContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflowY: 'scroll',
  gap: 'token(spacing.1, 0.25rem)',
  height: '100%',
  paddingBlock: 'token(spacing.2, 0.5rem)',
  width: '100%'
});
