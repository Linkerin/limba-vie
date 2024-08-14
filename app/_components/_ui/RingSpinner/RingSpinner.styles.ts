import { css } from '@/styled-system/css';

export const styles = css.raw({
  aspectRatio: 'square',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2xl',
  height: '1em',
  position: 'relative',

  '& > span': {
    position: 'absolute',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'currentcolor transparent transparent transparent',
    width: '75%',
    height: '75%',
    animation: 'ringSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',

    _motionReduce: {
      animationDuration: '2.4s'
    }
  },

  '& span:nth-child(1)': {
    animationDelay: '-0.45s'
  },

  '& span:nth-child(2)': {
    animationDelay: '-0.3s'
  },

  '& span:nth-child(3)': {
    animationDelay: '-0.15s'
  }
});
