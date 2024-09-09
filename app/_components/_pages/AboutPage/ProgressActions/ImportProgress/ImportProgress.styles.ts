import { css } from '@/styled-system/css';

export const labelStyles = css({
  display: 'block',
  marginBlockEnd: 'token(spacing.3, 0.75rem)'
});

export const inputStyles = css({
  display: 'none'
});

export const contentStyles = css({
  fontSize: 'xl',
  textAlign: 'center',

  '& > svg': {
    fontSize: 'xxx-large',
    display: 'inline-block',
    marginInline: 'auto'
  },

  '& > h2': {
    marginBlockStart: 'token(spacing.1, 0.25rem)'
  },

  '&[data-status="SUCCESS"]': {
    '& > h2, & svg': {
      color: 'success.darker'
    }
  },

  '&[data-status="ERROR"]': {
    '& > h2, & svg, & #error-msg': {
      color: 'secondary.darker'
    },
    '& #error-msg': {
      fontStyle: 'italic'
    }
  }
});

export const modalBtnStyles = css.raw({
  marginBlock: 'token(spacing.6, 1.5rem) token(spacing.2, 0.5rem)',
  width: '100%'
});
