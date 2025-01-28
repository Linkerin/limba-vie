import { css } from '@/styled-system/css';

export const sectionStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: '100%',
  maxWidth: 'content',
  marginInline: 'auto',
  textAlign: 'center'
});

export const textStyles = css({
  fontSize: 'token(fontSizes.xl, 1.25rem)'
});
