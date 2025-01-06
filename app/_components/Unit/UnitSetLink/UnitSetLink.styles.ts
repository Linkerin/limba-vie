import { css } from '@/styled-system/css';

export const popoverSpinnerStyles = css.raw({
  position: 'absolute',
  left: 'calc(calc(var(--elem-width-for-popover, 100%) / 2) - calc(token(fontSizes.4xl) / 2))',
  bottom: '-50%',
  backgroundColor: 'background-darker',
  borderRadius: 'sm',
  color: 'main.container.darker',
  fontSize: '4xl',
  zIndex: 1
});

export const setStyles = css({
  '--elem-width-for-popover': '5.5rem',

  aspectRatio: 'square',
  color: 'main',
  width: 'var(--elem-width-for-popover, 5.5rem)',

  '&[data-completed=true]': {
    color: 'success.dark'
  },

  '&[data-disabled=true]': {
    filter: 'grayscale(80%)',
    opacity: 0.6,
    pointerEvents: 'none',
    userSelect: 'none'
  }
});

export const contentStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.3, 0.75rem)',
  borderRadius: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: 'sm',
  height: '100%',
  width: '100%',
  textDecoration: 'none'
});

export const emojiStyles = css({
  fontSize: '3xl'
});

export const completedIconStyles = css({
  position: 'absolute',
  top: '0rem',
  right: '0rem',
  border: 'solid token(colors.success.dark)',
  borderWidth: '0 0 2px 2px',
  borderRadius: '0rem token(radii.sm, 0.25rem) 0rem token(radii.sm, 0.25rem)',
  padding: 'token(spacing.0.5, 0.125rem)'
});

export const popoverHeadingStyles = css({
  color: 'success.darker',
  margin: '0rem',
  textAlign: 'center',

  '& ~ a': {
    width: '100%'
  }
});
