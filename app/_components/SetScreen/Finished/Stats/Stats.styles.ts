import { css } from '@/styled-system/css';

export const sectionStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  gap: 'token(spacing.1, 0.25rem)'
});

export const statContainerStyles = css({
  aspectRatio: '1 / 1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.1, 0.25rem)',
  fontSize: 'sm',
  height: 'auto',
  width: 'min(28dvw, 5rem)',

  '& > p:first-of-type': {
    fontSize: 'lg',
    fontWeight: 'bold'
  }
});
