import { css } from '@/styled-system/css';

export const sectionStyles = css({
  animation: 'fadeIn',
  backgroundColor: 'secondary.container',
  border: '2px solid token(colors.secondary.darker)',
  borderRadius: 'sm',
  marginBlock: 'token(spacing.4, 1rem)',
  padding:
    'token(spacing.2, 0.5rem) token(spacing.4, 1rem) token(spacing.4, 1rem)',

  '& > p:first-of-type': {
    color: 'secondary.darker',
    fontSize: 'xl'
  }
});

export const errorStyles = css({
  fontStyle: 'italic',
  marginBlock: 'token(spacing.2, 0.5rem)'
});
