import { css } from '@/styled-system/css';

export const sectionStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  gap: 'token(spacing.1, 0.25rem)',

  '& > div': {
    position: 'relative',
    width: 'min(28dvw, 5rem)'
  }
});

export const scoreStyles = css({
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: "url('/images/marker_circle.svg')",
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',

  '& > p': {
    fontSize: '2rem'
  }
});

export const timeStyles = css({
  backgroundColor: 'primary.container-low',
  border: '2px solid token(colors.primary.darker)',
  borderRadius: 'sm',
  color: 'primary.dark',
  fontSize: 'lg',
  fontWeight: 'bold',
  fontFamily: "'Roboto Mono', 'SF Mono', Consolas, ui-monospace, monospace",
  padding: 'token(spacing.1, 0.25rem) token(spacing.2, 0.5rem)',
  position: 'relative',

  '& > time > span': {
    animation: 'blink 2s linear infinite',
    verticalAlign: '6%'
  },

  '&::before': {
    content: '""',
    backgroundColor: 'primary.container',
    border: '2px solid token(colors.primary.darker)',
    borderRadius: 'xs',
    display: 'block',
    height: '0.5rem',
    position: 'absolute',
    top: '100%',
    width: '85%',
    left: '50%',
    transform: 'translateX(-50%)'
  }
});

export const revisedStyles = css({
  aspectRatio: '1 / 1',

  padding: 'token(spacing.2, 0.5rem)',

  '& > p:first-of-type': {
    fontSize: '4xl',
    fontWeight: 'bold'
  },

  '& > p:last-of-type': {
    position: 'absolute',
    left: '5%',
    top: '44%',
    border: '2px solid token(colors.success.dark)',
    borderRadius: 'sm',
    color: 'on-success-container',
    fontSize: 'md',
    letterSpacing: '1px',
    marginBlock: 'token(spacing.1, 0.25rem) token(spacing.2, 0.5rem)',
    opacity: 0.7,
    padding: '0rem token(spacing.3, 0.75rem) token(spacing.1, 0.25rem)',
    transform: 'rotate(-25deg)'
  }
});
