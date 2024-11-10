import { css } from '@/styled-system/css';

export const sectionStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
  animation: 'fadeIn'
});

export const sentenceStyles = css.raw({
  marginBlock: 'token(spacing.4, 1rem)'
});

export const dexLinkStyles = css({
  fontSize: 'xs',
  marginBlockStart: 'auto',
  width: '90%',

  '& svg': {
    display: 'inline-block',
    marginInlineStart: '0.25em',
    verticalAlign: '-11.5%'
  },

  '& > span': {
    fontWeight: 'bold'
  }
});
