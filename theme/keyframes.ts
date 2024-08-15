import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  'fade-in': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  sound: {
    '0%': {
      transform: 'translateX(0) translateY(0) scale(1)',
      opacity: 1
    },
    '50%': {
      transform: 'translateX(-10%) translateY(10%) scale(0.8)',
      opacity: 0
    },
    '100%': {
      transform: 'translateX(0) translateY(0) scale(1)',
      opacity: 1
    }
  },
  ringSpin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  appearance: {
    '0%': { opacity: 0 },
    '85%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  flipIn: {
    '0%': {
      position: 'absolute',
      bottom: '-500px'
    },
    '100%': {
      position: 'relative',
      bottom: '0rem'
    }
  },
  'move-in': {
    '0%': { bottom: '-300px' },
    '100%': { bottom: '0px' }
  }
});
