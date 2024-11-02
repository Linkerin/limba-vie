import { css } from '@/styled-system/css';

const popoverPosMargin = 'token(spacing.4, 1rem)';
const popoverPosX = '0rem';
const popoverPosY = `calc(100% + ${popoverPosMargin})`;
const arrowPosX = `calc(var(--elem-width-for-popover, 25%) / 2 - ${popoverPosMargin} / 2)`;
const arrowPosY = `calc(2px - ${popoverPosMargin})`;

export const styles = css({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.4, 1rem)',
  backgroundColor: 'background-darker',
  borderRadius: 'sm',
  boxShadow: 'sm',
  padding: 'token(spacing.4, 1rem)',
  width: 'min(60dvw, 300px)',
  zIndex: 1,

  _before: {
    content: '""',
    position: 'absolute',
    display: 'block',
    width: '0rem',
    height: '0rem',
    borderLeft: `calc(${popoverPosMargin} / 1.5) solid transparent`,
    borderRight: `calc(${popoverPosMargin} / 1.5) solid transparent`,
    borderBottom: `${popoverPosMargin} solid token(colors.background-darker)`
  },

  '&[data-x="left"]': {
    left: popoverPosX,

    _before: {
      left: arrowPosX
    }
  },

  '&[data-x="right"]': {
    right: popoverPosX,

    _before: {
      right: arrowPosX
    }
  },

  '&[data-y="top"]': {
    bottom: popoverPosY,

    _before: {
      bottom: arrowPosY,
      transform: 'rotateX(180deg)'
    }
  },

  '&[data-y="bottom"]': {
    top: popoverPosY,

    _before: {
      top: arrowPosY
    }
  }
});
