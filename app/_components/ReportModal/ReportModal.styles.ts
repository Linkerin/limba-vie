import { css } from '@/styled-system/css';

export const btnStyles = css.raw({
  padding: 'token(spacing.2, 0.25rem)'
});

export const formStyles = css({
  marginBlockStart: 'token(spacing.2, 0.5rem)',
  userSelect: 'none'
});

export const fieldsetStyles = css({
  display: 'flex',
  flexDirection: 'column',

  '& > legend': {
    color: 'primary.darker',
    fontSize: '2xl',
    marginBlockEnd: 'token(spacing.4, 1rem)',
    '& > sup': {
      color: 'secondary.darker',
      fontSize: 'lg'
    }
  }
});

export const radioLabelStyles = css({
  display: 'grid',
  gridTemplateColumns: '1em auto',
  gap: 'token(spacing.2, 0.5rem)',
  marginBlock: 'token(spacing.2, 0.5rem)',
  paddingInlineStart: 'token(spacing.4, 1rem)',

  '&, & *': {
    cursor: 'pointer'
  }
});

export const radioInputStyles = css({
  appearance: 'none',
  aspectRatio: '1 / 1',
  border: '1px solid currentColor',
  borderRadius: 'xs',
  color: 'currentColor',
  font: 'inherit',
  height: '1em',
  margin: '0rem',

  '&:checked': {
    backgroundColor: 'primary',
    borderColor: 'primary'
  }
});

export const textareaContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'token(spacing.2, 0.5rem)',
  marginBlock: 'token(spacing.4, 1rem)'
});

export const textareaStyles = css({
  backgroundColor: 'background',
  border: '1px solid token(colors.main)',
  borderRadius: 'sm',
  padding: 'token(spacing.2, 0.5rem)',
  width: 'min(22rem, 100%)',
  resize: 'none'
});

export const hiddenInput = css({
  display: 'none'
});
