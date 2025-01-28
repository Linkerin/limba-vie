import { css } from '@/styled-system/css';

export const containerStyles = css({
  height: '100%',

  xl: {
    display: 'grid',
    gridTemplateColumns: '25dvw 1fr 25dvw'
  }
});

export const asideStyles = css({
  hideBelow: 'xl',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  gap: 'token(spacing.4, 1rem)',
  marginBlockStart: '4.5rem',

  '& > p': {
    textAlign: 'right'
  },

  '& > div': {
    marginBlock: 0,
    width: 'fit-content'
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
  width: '100%',

  '& > p:first-of-type': {
    alignSelf: 'flex-end'
  }
});

export const reportCounterContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: 'content',
  width: '100%'
});

export const contentContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflowY: 'scroll',
  gap: 'token(spacing.1, 0.25rem)',
  height: '100%',
  paddingBlock: 'token(spacing.2, 0.5rem)',
  scrollbarWidth: 'none',
  width: '100%',

  xl: {
    marginBlockStart: 'token(spacing.6, 1.5rem)'
  }
});
