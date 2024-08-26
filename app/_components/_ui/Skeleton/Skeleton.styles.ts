import { css } from '@/styled-system/css';

export const styles = css.raw({
  animation: 'pulse 1.6s infinite linear',
  backgroundColor: 'main.container.darker',
  borderRadius: 'sm',
  cursor: 'progress',
  height: '1em',
  overflow: 'hidden',
  width: '100%',

  _motionReduce: {
    animationDuration: '3s'
  },

  '& *': {
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity 0.4s linear'
  },

  '&[data-loaded=true]': {
    animation: 'none',
    cursor: 'default',
    visibility: 'hidden',

    '& *': {
      visibility: 'visible',
      opacity: 1
    }
  },

  '&[data-fit=true]': {
    height: 'fit-content',
    width: 'fit-content'
  }
});
