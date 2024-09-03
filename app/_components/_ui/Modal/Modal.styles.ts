import { css } from '@/styled-system/css';

export const containerStyles = css.raw({
  backgroundColor: 'primary.container-low',
  border: '2px solid token(colors.primary.darker)',
  borderRadius: 'sm',
  margin: 'auto',
  padding:
    'token(spacing.4, 1rem) token(spacing.4, 1rem) token(spacing.2, 0.5rem)',
  width: 'min(768px, 80dvw)',

  '&::backdrop': {
    backdropFilter: 'blur(4px) brightness(90%)'
  }
});

export const closeBtnStyles = css.raw({
  alignSelf: 'flex-end',
  aspectRatio: '1 / 1',
  fontSize: 'xl',
  marginInlineStart: 'auto',
  padding: '0rem'
});
