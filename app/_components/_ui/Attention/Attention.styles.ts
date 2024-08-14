import { css } from '@/styled-system/css';

export const containerStyles = css({
  backgroundColor: 'secondary.container-low',
  borderRadius: 'sm',
  border: '2px solid token(colors.secondary)',
  marginBlock: 'token(spacing.3, 0.75rem)',
  padding: 'token(spacing.2, 0.5rem) token(spacing.4, 1rem)',
  width: '100%'
});

export const headingStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 'token(spacing.2, 0.5rem)',
  color: 'secondary.darker',
  fontSize: 'lg',
  marginBlockEnd: 'token(spacing.1, 0.25rem)',

  '& > span': {
    fontSize: 'xl'
  }
});
