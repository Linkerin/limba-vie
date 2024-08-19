import { css } from '@/styled-system/css';

export const containerStyles = css.raw({
  marginBlock: 'token(spacing.3, 0.75rem)',
  width: '100%'
});

export const sentenceStyles = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 'token(spacing.1, 0.25rem)',
  backgroundColor: 'primary.container-low',
  border: 'solid token(colors.primary.darker)',
  borderRadius: 'sm',
  borderWidth: '0.125rem',
  color: 'on-primary-container',
  marginBlockEnd: 'token(spacing.1, 0.25rem)',

  '& > p': {
    padding: 'token(spacing.2, 0.5rem) token(spacing.4, 1rem)'
  }
});

export const audioBtnStyles = css.raw({
  aspectRatio: '1 / 1',
  fontSize: '1.375em',
  paddingInline: 'token(spacing.2, 0.5rem)',

  _active: {
    background: 'none'
  },

  '& ~ p': {
    paddingInlineStart: '0rem'
  }
});

export const translationStyles = css({
  fontStyle: 'italic',
  opacity: 0.88,
  textAlign: 'end'
});
