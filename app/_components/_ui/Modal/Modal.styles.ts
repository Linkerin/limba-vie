import { css } from '@/styled-system/css';

export const containerStyles = css.raw({
  backgroundColor: 'main.container',
  border: '2px solid token(colors.main)',
  borderRadius: 'sm',
  margin: 'auto',
  padding: 'token(spacing.4, 1rem)',
  width: 'fit-content',

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
