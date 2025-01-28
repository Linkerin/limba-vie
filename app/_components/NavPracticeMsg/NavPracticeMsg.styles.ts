import { css } from '@/styled-system/css';

export const sectionStyles = css({
  '--nav-icon-size': '2.75rem',

  position: 'absolute',
  bottom: '110%',
  right: 'calc(50% - calc(var(--nav-icon-size) / 2))',
  backgroundColor: 'background',
  border: '2px solid token(colors.main)',
  borderRadius: 'xs',
  boxShadow: 'lg',
  color: 'main',
  fontSize: 'sm',
  padding: 'token(spacing.2, 0.5rem)',
  textAlign: 'center',
  zIndex: 1,
  width: 'clamp(15dvw, 250px, 50dvw)',
  animation: 'overhang 1.6s linear infinite',

  '& > *': {
    zIndex: 1,
    position: 'relative'
  },

  '& + *[data-element="nav-item"]': {
    '& *': {
      color: 'primary.darker'
    }
  },

  '&::after': {
    '--arrow-size': '1rem',

    display: 'block',
    content: '""',
    position: 'absolute',
    bottom: 'calc(0rem - var(--arrow-size))',
    right: 'calc(calc(var(--nav-icon-size) / 4) + calc(var(--arrow-size) / 2))',
    backgroundColor: 'background',
    border: '2px solid',
    borderColor:
      'transparent token(colors.main) token(colors.main) transparent',
    borderRadius: 'xs',
    height: 'var(--arrow-size)',
    transform: 'translate(50%, -50%) rotate(45deg);',
    width: 'var(--arrow-size)',
    zIndex: 0
  }
});
