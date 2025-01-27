import { css } from '@/styled-system/css';

export const headerStyles = css({
  backgroundColor: 'background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBlockEnd: '2px solid token(colors.main, colors.stone.700)',
  height: '3.75rem',
  paddingInline: 'token(spacing.4, 1rem)',
  position: 'sticky',
  top: '0rem',
  width: '100%',
  zIndex: 1
});

export const logoContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'token(spacing.6, 1.5rem)',
  height: '100%'
});

export const logoStyles = css({
  height: '100%',
  paddingBlock: '0.125rem',

  '& > img': {
    height: '100%',
    width: 'auto'
  }
});

export const rightContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.3, 0.75rem)'
});
