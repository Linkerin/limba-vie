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

export const logoStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: '0.0075em',
  fontSize: 'lg',
  fontWeight: 500,
  lineHeight: '1.25rem',
  userSelect: 'none',

  '&, &:hover, &:visited': {
    color: 'hsl(348, 92%, 42%)'
  },
  '& > span:first-of-type': {
    borderBottom: '2px solid hsl(35, 75%, 55%)',
    color: 'hsl(216, 90%, 30%)'
  }
});

export const rightContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.3, 0.75rem)'
});
