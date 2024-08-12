import { css } from '@/styled-system/css';

export const detailsStyles = css({
  position: 'relative',

  _open: {
    '& > summary': {
      boxShadow: 'inset 0 0 0.75rem rgba(0, 0, 0, 0.3)',
      top: 'token(spacing.1, 0.25rem)'
    },

    '& ~ *[data-element="sets-list"]': {
      marginBlockStart: 'token(spacing.4, 1rem)',
      maxHeight: 'calc(calc(5.5rem * 3) + calc(token(spacing.2, 0.5rem) * 2))',
      opacity: 1,

      '& > li': {
        visibility: 'visible'
      }
    },

    '& span[data-element="accordion-arrow"]': {
      transform: 'rotateX(180deg)'
    }
  }
});

const shadowSize = 'token(sizes.0.5, 0.125rem)';

export const unitContentStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  border: `${shadowSize} solid token(colors.main)`,
  borderRadius: 'sm',
  boxShadow: `${shadowSize} ${shadowSize} token(colors.main)`,
  color: 'main',
  cursor: 'pointer',
  padding:
    'token(spacing.6, 1.5rem) token(spacing.3.5, 0.875rem) token(spacing.6, 1.5rem) token(spacing.6, 1.5rem)',
  position: 'relative',
  width: '100%',
  zIndex: 0,

  _hover: {
    backgroundColor: 'background-darker'
  },

  _active: {
    backgroundColor: 'background-dark'
  },

  '&:hover img, &:active img': {
    opacity: 0.85
  },

  '&[data-completed=true]': {
    backgroundColor: 'success.container-low',
    borderColor: 'success.dark',
    boxShadow: `${shadowSize} ${shadowSize} token(colors.success.dark)`,

    _hover: {
      backgroundColor: 'success.container'
    },

    _active: {
      backgroundColor: 'success.container-dark'
    },

    '&, & h2': {
      color: 'on-success-container'
    },

    '& img': {
      filter: 'opacity(0.8) drop-shadow(0 0 0 token(success))'
    }
  }
});
