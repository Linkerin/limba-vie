import { cva } from '@/styled-system/css';
import { RecipeDefinition } from '@/styled-system/types';

export const buttonVariants: RecipeDefinition = {
  variants: {
    variant: {
      base: {
        borderColor: 'main',
        boxShadow: '0.0625rem 0.0625rem token(colors.main)',
        '&, &:hover:not(:disabled), &:visited': {
          color: 'main'
        },
        '&:active:not(:disabled)': {
          backgroundColor: 'main.container.darker'
        }
      },
      primary: {
        borderColor: 'primary.400',
        boxShadow: '0.0625rem 0.0625rem token(colors.primary.400)',
        '&, &:hover:not(:disabled), &:visited': {
          color: 'primary.400'
        },
        '&:active:not(:disabled)': {
          backgroundColor: 'primary.850'
        }
      },
      secondary: {
        borderColor: 'secondary.400',
        boxShadow: '0.0625rem 0.0625rem token(colors.secondary.400)',
        '&, &:hover:not(:disabled), &:visited': {
          color: 'secondary.400'
        },
        '&:active:not(:disabled)': {
          backgroundColor: 'secondary.850'
        }
      },
      success: {
        borderColor: 'success.400',
        boxShadow: '0.0625rem 0.0625rem token(colors.success.400)',
        '&, &:hover:not(:disabled), &:visited': {
          color: 'success.400'
        },
        '&:active:not(:disabled)': {
          backgroundColor: 'success.850'
        }
      }
    }
  },
  defaultVariants: {
    variant: 'base'
  }
};

export const buttonStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'token(spacing.2, 0.5rem)',
    background: 'none',
    borderStyle: 'solid',
    borderRadius: 'token(radii.sm, 0.25rem)',
    borderWidth: 'token(sizes.0.5, 0.125rem)',
    cursor: 'pointer',
    height: 'fit-content',
    fontSize: 'token(fontSizes.xl, 1.25rem)',
    lineHeight: 'normal',
    padding: '0.5em 1.5em',
    position: 'relative',
    textAlign: 'center',
    userSelect: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: 'fit-content',

    '&, &:hover, &:active': {
      textDecoration: 'none'
    },

    '&:hover:not(:disabled)': {
      opacity: 0.88
    },

    '&:active:not(:disabled)': {
      boxShadow: 'none',
      top: 'calc(token(sizes.0.5, 0.125rem) * 2)'
    },

    _disabled: {
      backgroundColor: 'none',
      borderColor: 'neutral.500',
      boxShadow: '0.0625rem 0.0625rem neutral.500',
      color: 'neutral.500',
      cursor: 'not-allowed',
      opacity: 0.7
    },

    _focusVisible: {
      borderColor: 'inherit',
      outline: '4px solid token(colors.primary.800, currentColor)',
      outlineOffset: '4px'
    },

    '& > svg': {
      margin: 'auto'
    }
  },
  ...buttonVariants
});
