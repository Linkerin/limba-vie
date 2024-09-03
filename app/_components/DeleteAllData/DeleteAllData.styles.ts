import { css } from '@/styled-system/css';

export const btnStyles = css.raw({
  fontSize: 'lg',
  marginBlockStart: 'token(spacing.3, 0.75rem)'
});

export const modalStyles = css.raw({
  backgroundColor: 'secondary.container',
  borderColor: 'secondary.dark'
});

export const headingStyles = css({
  color: 'secondary.darker',
  textAlign: 'center'
});

export const pStyles = css({
  '& strong': {
    color: 'secondary.darker'
  }
});

export const confirmationBtnStyles = css.raw({
  marginBlock: 'token(spacing.6, 1.5rem) token(spacing.3, 0.75rem)',
  width: '100%'
});
