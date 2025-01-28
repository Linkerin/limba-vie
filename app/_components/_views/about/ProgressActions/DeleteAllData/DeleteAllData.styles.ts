import { css } from '@/styled-system/css';

export const modalStyles = css.raw({
  backgroundColor: 'secondary.container',
  borderColor: 'secondary.dark',
  maxWidth: 'content'
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
  marginBlockStart: 'token(spacing.6, 1.5rem)',
  width: '100%'
});
