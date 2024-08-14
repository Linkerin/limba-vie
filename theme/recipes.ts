import { defineRecipe } from '@pandacss/dev';

const shadowSize = 'token(sizes.0.5, 0.125rem)';

export const cardRecipe = defineRecipe({
  className: 'card',
  description: 'App card styling for border and shadows',
  base: {
    border: `${shadowSize} solid`,
    borderRadius: 'sm',
    position: 'relative',

    _active: {
      boxShadow: 'none',
      top: 'token(spacing.1, 0.25rem)'
    }
  },
  variants: {
    variant: {
      base: {
        borderColor: 'main',

        '&:not(:active)': {
          boxShadow: `${shadowSize} ${shadowSize} token(colors.main)`
        },

        _hover: {
          backgroundColor: 'background-darker'
        },

        _active: {
          backgroundColor: 'background-dark'
        }
      },
      primary: {
        backgroundColor: 'primary.container-low',
        borderColor: 'primary.dark',

        '&:not(:active)': {
          boxShadow: `${shadowSize} ${shadowSize} token(colors.primary.dark)`
        },

        _hover: {
          backgroundColor: 'primary.container'
        },

        _active: {
          backgroundColor: 'primary.container-dark'
        }
      },
      secondary: {
        backgroundColor: 'secondary.container-low',
        borderColor: 'secondary.dark',

        '&:not(:active)': {
          boxShadow: `${shadowSize} ${shadowSize} token(colors.secondary.dark)`
        },

        _hover: {
          backgroundColor: 'secondary.container'
        },

        _active: {
          backgroundColor: 'secondary.container-dark'
        }
      },
      success: {
        backgroundColor: 'success.container-low',
        borderColor: 'success.dark',

        '&:not(:active)': {
          boxShadow: `${shadowSize} ${shadowSize} token(colors.success.dark)`
        },

        _hover: {
          backgroundColor: 'success.container'
        },

        _active: {
          backgroundColor: 'success.container-dark'
        }
      }
    }
  },
  defaultVariants: {
    variant: 'base'
  }
});
