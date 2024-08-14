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
  border: '1px solid token(colors.main)',
  borderRadius: 'sm',
  color: 'main',
  position: 'relative',
  width: 'var(--elem-width-for-popover, 5.5rem)',

  _hover: {
    backgroundColor: 'background-darker'
  },

  _active: {
    backgroundColor: 'background-dark'
  },

  '&[data-completed=true]': {
    borderColor: 'success.dark',
    backgroundColor: 'success.container-low',
    color: 'success.dark',

    _hover: {
      backgroundColor: 'success.container'
    },

    _active: {
      backgroundColor: 'success.container-dark'
    }
  }
});

export const contentStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.2, 0.5rem)',
  borderRadius: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: 'md',
  height: '100%',
  width: '100%',
  textDecoration: 'none'
});

export const emojiStyles = css({
  fontSize: '2xl'
});

export const completedIconStyles = css({
  position: 'absolute',
  top: '0rem',
  right: '0rem',
  backgroundColor: 'success.container',
  border: 'solid token(colors.success.dark)',
  borderWidth: '0 0 1px 1px',
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
