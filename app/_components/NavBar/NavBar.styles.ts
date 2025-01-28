import { css } from '@/styled-system/css';

export const footerStyles = css({
  hideFrom: 'xl',

  position: 'sticky',
  bottom: '0rem',
  left: '0rem',
  backgroundColor: 'background-darker',
  borderBlockStart: '2px solid token(colors.main, colors.stone.700)',
  fontSize: '2rem',
  width: '100%',
  animation: 'fadeIn',

  '&[data-apple-pwa=true]': {
    paddingBlockEnd: 'apple-pwa-pd'
  }
});

export const navContainerStyles = css({
  height: '100%',
  paddingBlock: 'token(spacing.1, 0.25rem)'
});

export const navListStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '100%',
  listStyle: 'none',
  padding: '0rem'
});
