import { css } from '@/styled-system/css';

export const styles = css({
  animation: 'pageSlide',

  '& > h1 > span': {
    color: 'primary'
  },

  '& li, & p': {
    fontSize: 'md',
    lineHeight: '1.5em',
    marginBlock: 'token(spacing.4, 1rem)'
  },

  '& li > span': {
    fontWeight: 'bold'
  },

  '& ol': {
    listStyleType: 'decimal'
  },

  '& ul': {
    listStyleType: 'circle'
  },

  '& ol, & ul': {
    paddingInlineStart: 'token(spacing.6, 1.5rem)'
  }
});
