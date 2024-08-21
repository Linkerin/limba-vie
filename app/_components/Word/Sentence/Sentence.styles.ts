import { css } from '@/styled-system/css';

export const containerStyles = css.raw({
  animation: 'fadeIn',
  border: '2px solid token(colors.main)',
  borderRadius: 'sm',
  backgroundColor: 'background-darker',
  color: 'main',
  fontSize: 'sm',
  padding:
    'token(spacing.1.5, 0.375rem) token(spacing.3, 0.75rem) token(spacing.2, 0.5rem)',
  marginBlock: 'auto',
  transition: 'all 0.5s ease-in',
  width: '90%',

  '&[data-error=true]': {
    backgroundColor: 'secondary.container-low',
    borderColor: 'secondary',
    color: 'on-secondary-container'
  }
});

export const enStyles = css({
  color: 'main',
  fontStyle: 'italic',
  opacity: 0.88
});

export const roStyles = css({
  fontSize: 'lg',
  marginBlockEnd: 'token(spacing.0.5, 0.125rem)'
});
