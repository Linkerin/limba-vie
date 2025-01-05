import { css } from '@/styled-system/css';

export const containerStyles = css({
  animation: 'pageSlide',

  '& > section:not(:last-of-type)': {
    marginBlockEnd: 'token(spacing.8, 2rem)'
  },

  '& a': {
    display: 'inline-block',

    '& > svg': {
      display: 'inline-block',
      height: '1em',
      minWidth: '1em',
      width: 'auto',
      verticalAlign: '-11.5%'
    }
  },

  '& p, & label': {
    marginBlockEnd: 'token(spacing.3, 0.75rem)'
  },

  '& label': {
    display: 'block'
  }
});

export const introStyles = css({
  '& h1': {
    fontSize: 'token(fontSizes.5xl, 3rem)',
    lineHeight: '1.25em',
    marginBlockEnd: 'token(spacing.6, 1.5rem)',

    '& > span': {
      color: 'primary',
      fontWeight: 'bold',
      marginInlineEnd: '0.0625em'
    }
  },

  '& p > svg': {
    color: 'primary',
    display: 'inline-block'
  }
});

export const instagramIconStyles = css({
  fontSize: '1.375em',
  marginInline: 'token(spacing.1, 0.25rem)'
});

export const addressStyles = css({
  fontStyle: 'normal'
});

export const creditsListStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'token(spacing.2, 0.5rem)',

  '& > li': {
    fontSize: 'sm',
    lineHeight: '1.375rem',

    _before: {
      content: '"—"',
      display: 'inline-block',
      color: 'primary',
      height: '0.5em',
      marginInlineEnd: '0.5em'
    }
  }
});

export const hrStyles = css({
  borderColor: 'main.lower',
  marginBlock: 'token(spacing.4, 1rem)'
});
