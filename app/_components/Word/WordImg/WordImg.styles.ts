import { css } from '@/styled-system/css';

const cardPaddings = {
  main: 'token(spacing.2, 0.5rem)',
  bottom: '1.375rem'
};

export const containerStyles = css({
  background: 'none',
  border: 'none',
  padding: '0rem'
});

export const cardStyles = css({
  position: 'relative',
  backgroundColor: 'primary.container-low',
  borderRadius: 'sm',
  boxShadow: 'md',
  height: `calc(token(sizes.img.size) + calc(${cardPaddings.main} + ${cardPaddings.bottom}))`,
  width: `calc(token(sizes.img.size) + calc(${cardPaddings.main} * 2))`,
  marginBlockEnd: 'token(spacing.3, 0.75rem)',
  paddingInline: cardPaddings.main,
  paddingBlock: `${cardPaddings.main} ${cardPaddings.bottom}`,
  transformStyle: 'preserve-3d',
  transition: 'all 0.5s ease',
  zIndex: 0,

  xl: {
    marginBlockEnd: 'token(spacing.6, 1.5rem)'
  },

  '&[data-flipped=true]': {
    transform: 'rotateY(180deg)'
  },

  '&[data-gender="m"]': {
    backgroundColor: 'g.masculine'
  },

  '&[data-gender="n"]': {
    backgroundColor: 'g.neutral'
  },

  '&[data-gender="f"]': {
    backgroundColor: 'g.feminine'
  }
});

export const flipIconStyles = css({
  position: 'fixed',
  bottom: cardPaddings.bottom,
  left: cardPaddings.main,
  backgroundColor: 'background-dark/30',
  borderRadius: 'xs',
  color: 'primary',
  fontSize: '1.375rem',
  padding: 'token(spacing.0.5, 0.125rem)',
  zIndex: 1
});

export const sideStyles = css({
  position: 'absolute',
  backfaceVisibility: 'hidden'
});

export const sideContentStyles = css({
  aspectRatio: '1 / 1',
  borderRadius: 'xs',
  height: 'token(sizes.img.size, min(30dvh, 480px))',
  width: 'auto'
});

export const backStyles = css({
  transform: 'rotateY(180deg)',

  '& > p': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'background',
    color: 'on-primary-container',
    fontSize: '1.75rem',
    fontWeight: 'bold'
  }
});

export const loaderStyles = css({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'primary.container',
  opacity: 1,
  transition: 'all ease-in 0.4s',
  zIndex: 1,

  '&[data-loaded=true]': {
    opacity: 0
  }
});
