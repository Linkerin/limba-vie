import { css } from '@/styled-system/css';

export const formStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.6, 1.5rem)',
  marginBlock: 'auto 0rem',
  paddingBlock: 'token(spacing.4, 1rem)',
  width: '90%',

  '&[data-apple-pwa=true]': {
    paddingBlockEnd: 'apple-pwa-pd'
  }
});

export const btnStyles = css.raw({
  width: '100%'
});

export const labelStyles = css({
  color: 'main',
  fontSize: 'sm',
  fontStyle: 'italic',
  width: '100%'
});

export const inputStyles = css({
  backgroundColor: 'background',
  border: '2px solid token(colors.main)',
  borderRadius: 'sm',
  color: 'main',
  fontSize: 'xl',
  fontStyle: 'normal',
  fontWeight: 'normal',
  marginBlockStart: 'token(spacing.3, 0.75rem)',
  minHeight: '3.375rem',
  paddingInline: 'token(spacing.2, 0.5rem)',
  width: '100%',

  _focusVisible: {
    borderColor: 'primary.container',
    outline: '0.0625rem solid token(colors.primary.container)'
  },

  '&[data-gender="m"]:focus-visible': {
    borderColor: 'g.masculine',
    outlineColor: 'g.masculine'
  },

  '&[data-gender="f"]:focus-visible': {
    borderColor: 'g.feminine',
    outlineColor: 'g.feminine'
  },

  '&[data-gender="n"]:focus-visible': {
    borderColor: 'g.neutral',
    outlineColor: 'g.neutral'
  },

  _disabled: {
    borderColor: 'main.lower',
    color: 'main.lower',
    cursor: 'not-allowed',
    opacity: 0.7
  }
});

export const answerStyles = css({
  fontStyle: 'italic',
  fontWeight: 'bold'
});

export const wrongInputStyles = css({
  fontSize: '0.75em',
  marginBlockStart: 'token(spacing.1, 0.25rem)',

  '& > span': {
    fontStyle: 'italic'
  }
});
