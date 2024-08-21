import { css } from '@/styled-system/css';

export const buttonStyles = css.raw({
  aspectRatio: '1 / 1',
  background: 'none',
  border: 'none',
  borderRadius: 'sm',
  boxShadow: 'none',
  color: 'primary',
  cursor: 'pointer',
  fontSize: '0.625em',
  padding: 'token(spacing.1, 0.25rem)',

  _active: {
    backgroundColor: 'primary.container'
  },

  '& > svg': {
    minWidth: '1em'
  }
});

export const iconStyles = css({
  '&[data-playing=true]': {
    '& path:first-of-type': {
      animation: '1.2s sound ease-in-out infinite'
    },
    '& path:nth-of-type(2)': {
      animation: '1.2s sound ease-in-out 0.25s infinite'
    }
  }
});
