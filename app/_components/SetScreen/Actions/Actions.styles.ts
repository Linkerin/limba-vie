import { css } from '@/styled-system/css';

export const containerStyles = css({
  backgroundColor: 'background',
  display: 'flex',
  justifyContent: 'space-around',
  maxWidth: 'content',
  paddingBlock: 'token(spacing.4, 1rem)',
  width: '100%',

  xl: {
    justifyContent: 'space-evenly'
    // gap: 'token(spacing.10, 2.5rem)'
  },

  '&[data-apple-pwa=true]': {
    paddingBlockEnd: 'apple-pwa-pd'
  }
});

export const exampleButtonStyles = css.raw({
  hideFrom: 'xl'
});
