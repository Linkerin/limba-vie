import { css } from '@/styled-system/css';

export const itemStyles = css.raw({
  height: '100%',
  position: 'relative',
  width: '50%'
});

export const linkStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.1, 0.25rem)',
  height: '100%',
  width: '100%',

  _active: {
    '& > span': {
      backgroundColor: 'background-dark',
      color: 'main.dark'
    }
  },

  '&, &:visited': {
    color: 'main'
  }
});

export const iconContainerStyles = css({
  borderRadius: 'md',
  padding: 'token(spacing.1.5, 0.375rem)',

  '&[data-current=true]': {
    backgroundColor: 'background-dark',
    color: 'main.dark'
  }
});
