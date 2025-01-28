import { css } from '@/styled-system/css';

export const containerStyles = css({
  animation: 'move-in 0.5s linear',
  position: 'fixed',
  bottom: '0rem',
  left: '50%',
  borderRadius: 'token(spacing.2, 0.5rem) token(spacing.2, 0.5rem) 0 0',
  fontSize: 'xl',
  maxWidth: 'content',
  padding:
    'token(spacing.6, 1.5rem) token(spacing.4, 1rem) token(spacing.8, 2rem)',
  transform: 'translateX(-50%)',
  width: '100%',
  zIndex: 10,

  '&[data-status="success"]': {
    backgroundColor: 'success.container',
    color: 'on-success-container'
  },

  '&[data-status="error"]': {
    backgroundColor: 'secondary.container',
    color: 'on-secondary-container'
  }
});

export const btnStyles = css.raw({
  marginBlockStart: 'token(spacing.6, 1.5rem)',
  width: '100%',

  _focusVisible: {
    outline: 'none'
  }
});
