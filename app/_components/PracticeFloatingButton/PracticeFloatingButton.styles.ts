import { css } from '@/styled-system/css';

export const styles = css.raw({
  backgroundColor: 'background',
  hideBelow: 'xl',
  position: 'absolute',
  top: '90dvh',
  left: '80dvw',
  zIndex: 2,
  paddingInline: 'token(spacing.4, 1rem) token(spacing.5, 1.25rem)',
  gap: 'token(spacing.3, 0.75rem)',

  '& svg': {
    fontSize: '1.25em'
  },

  '&:active:not(:disabled)': {
    top: 'calc(token(sizes.0.5, 0.125rem) * 2 + 90dvh)'
  }
});
