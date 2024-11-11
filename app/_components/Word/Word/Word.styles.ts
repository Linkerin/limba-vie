import { css } from '@/styled-system/css';

export const styles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'token(spacing.2, 0.5rem)',
  fontSize: 'min(2.75rem, 5.5vmax)',
  textAlign: 'center',

  '& > p:first-of-type': {
    lineHeight: '1.125em'
  }
});

export const genderStyles = css({
  fontSize: '1.75rem',
  lineHeight: '1em',
  marginBlockEnd: 'token(spacing.2, 0.5rem)',

  '&[data-gender="m"]': {
    color: 'g.masculine'
  },

  '&[data-gender="n"]': {
    color: 'g.neutral'
  },

  '&[data-gender="f"]': {
    color: 'g.feminine'
  }
});
