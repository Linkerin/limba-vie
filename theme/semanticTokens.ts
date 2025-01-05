import { defineSemanticTokens } from '@pandacss/dev';

export const semanticTokens = defineSemanticTokens({
  animations: {
    fadeIn: { value: 'fade-in {easings.in} 0.4s' },
    pageSlide: {
      value:
        'left-slide-in 0.4s {easings.in-out}, appearance 0.6s {easings.in-out}'
    }
  },
  colors: {
    main: {
      DEFAULT: { value: '{colors.zinc.700}' },
      darker: { value: '{colors.zinc.800}' },
      dark: { value: '{colors.zinc.900}' },
      lower: { value: '{colors.zinc.500}' },
      container: { value: '{colors.zinc.200}' },
      'container.darker': { value: '{colors.zinc.300}' }
    },
    primary: {
      DEFAULT: { value: '{colors.primary.500}' },
      darker: { value: '{colors.primary.400}' },
      dark: { value: '{colors.primary.300}' },
      'container-dark': { value: '{colors.primary.800}' },
      container: { value: '{colors.primary.900}' },
      'container-low': { value: '{colors.primary.950}' }
    },
    secondary: {
      DEFAULT: { value: '{colors.secondary.500}' },
      darker: { value: '{colors.secondary.400}' },
      dark: { value: '{colors.secondary.300}' },
      'container-dark': { value: '{colors.secondary.800}' },
      container: { value: '{colors.secondary.900}' },
      'container-low': { value: '{colors.secondary.950}' }
    },
    success: {
      DEFAULT: { value: '{colors.success.500}' },
      darker: { value: '{colors.success.400}' },
      dark: { value: '{colors.success.300}' },
      'container-dark': { value: '{colors.success.800}' },
      container: { value: '{colors.success.900}' },
      'container-low': { value: '{colors.success.950}' }
    },
    'on-primary-container': { value: '{colors.primary.300}' },
    'on-secondary-container': { value: '{colors.secondary.300}' },
    'on-success-container': { value: '{colors.success.300}' }
  },
  sizes: {
    'card-shadow-size': { value: '{sizes.0.5}' }
  },
  spacing: {
    'apple-pwa-pd': { value: '{spacing.5}' }
  }
});
