import { css } from '@/styled-system/css';

export const hintContainerStyles = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  animation: 'appearance 1s ease-in forwards',
  animationDelay: '6s',
  gap: 'token(spacing.1, 0.25rem)',
  fontSize: '2xl',
  opacity: 0,
  pointerEvents: 'none',
  visibility: 'hidden',
  width: '100%',

  '& > button': {
    fontSize: '3xl'
  }
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

export const reportCounterContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
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
