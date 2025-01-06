import { css } from '@/styled-system/css';

export const totalStyles = css({
  animation: 'fadeIn',
  fontSize: 'xs',
  textAlign: 'end',
  width: '100%',

  '& span': {
    color: 'primary.darker'
  }
});

export const listStyles = css({
  animation: 'fadeIn',
  fontSize: 'lg',
  padding: '0rem token(spacing.4, 1rem)',
  width: '100%',

  '@media (prefers-reduced-motion)': {
    animation: 'none'
  },

  '& > li': {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 'token(spacing.2, 0.5rem)',
    borderRadius: 'sm',
    padding: 'token(spacing.2, 0.5rem)',
    position: 'relative',
    whiteSpace: 'normal',

    '&:not(:last-of-type)': {
      marginBlockEnd: 'token(spacing.2, 0.5rem)'
    },

    _hover: {
      backgroundColor: 'main.container'
    }
  }
});

export const columnStyles = css({
  width: '50%'
});

export const roWordStyles = css({
  color: 'primary.darker',
  textDecoration: 'underline dotted',
  textUnderlinePosition: 'under'
});

export const roInfoStyles = css({
  fontSize: 'md',
  fontStyle: 'italic',
  opacity: 0.88
});
