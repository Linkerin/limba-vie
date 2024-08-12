import { css } from '@/styled-system/css';

export const setStyles = css({
  border: '1px solid token(colors.main)',
  borderRadius: 'sm',
  color: 'main',
  position: 'relative',
  width: 'fit-content',

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
  aspectRatio: 'square',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.2, 0.5rem)',
  borderRadius: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  height: '5.5rem',
  fontSize: 'md'
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
