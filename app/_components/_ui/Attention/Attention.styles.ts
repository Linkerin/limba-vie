import { css } from '@/styled-system/css';

export const containerStyles = css({
  backgroundColor: 'secondary.container-low',
  borderRadius: 'sm',
  border: '2px solid token(colors.secondary.darker)',
  marginBlock: 'token(spacing.3, 0.75rem)',
  padding: 'token(spacing.2, 0.5rem) token(spacing.4, 1rem)',
  width: '100%',

  '& strong': {
    color: 'on-secondary-container'
  }
});

export const headingStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 'token(spacing.2, 0.5rem)',
  color: 'on-secondary-container',
  fontSize: 'lg',
  marginBlockEnd: 'token(spacing.1, 0.25rem)',

  '& > span': {
    fontSize: 'xl'
  }
});
