import { css } from '@/styled-system/css';

export const progressContainerStyles = css({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '100%'
});

export const arrowIconStyles = css({
  display: 'block',
  top: 'token(spacing.2, 0.5rem)',
  fontSize: '1.75rem',
  marginInlineStart: 'token(spacing.4, 1rem)',
  position: 'relative',
  transition: 'transform 0.4s linear'
});

export const setsListStyles = css({
  display: 'flex',
  alignItems: 'stretch',
  flexWrap: 'wrap',
  gap: 'token(spacing.2, 0.5rem)',
  height: 'auto',
  listStyle: 'none',
  maxHeight: '0rem',
  opacity: 0,
  transition: `max-height 0.5s ease-in-out,
               margin 0.4s ease-in-out,
               opacity 0.4s linear`,

  '& > li': {
    visibility: 'hidden',
    transition: 'all 0.4s ease-in-out'
  }
});
