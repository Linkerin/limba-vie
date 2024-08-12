import {
  defineConfig,
  defineSemanticTokens,
  defineTokens
} from '@pandacss/dev';
import Spectrum, { createPalette } from '@snipshot/spectrum';

const primaryColor = new Spectrum('hex', '#4d52b3');
const secondaryColor = new Spectrum('hex', '#bf5540');
const successColor = new Spectrum('hex', '#609f7c');

function generateTokens(prefix: string, color: Spectrum) {
  const palette = createPalette(color);

  const tokens: Record<string, Record<'value', string>> = {};

  for (let i = 5; i < 100; i += 5) {
    tokens[`${prefix}.${i * 10}`] = { value: palette[i].hex };
  }

  return tokens;
}

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./app/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [],

  hash: process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD' ? true : false,
  minify: process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD' ? true : false,

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      tokens: defineTokens({
        colors: {
          background: { value: 'hsl(12, 33%, 97%)' },
          'background-darker': { value: 'hsl(12, 33%, 93%)' },
          'background-dark': { value: 'hsl(12, 33%, 85%)' },
          ...generateTokens('primary', primaryColor),
          ...generateTokens('secondary', secondaryColor),
          ...generateTokens('success', successColor)
        }
      }),
      semanticTokens: defineSemanticTokens({
        animations: { fadeIn: { value: 'fadeIn {easings.in} 0.4s' } },
        colors: {
          main: {
            DEFAULT: { value: '{colors.stone.700}' },
            dark: { value: '{colors.stone.900}' },
            'container.darker': { value: '{colors.stone.300}' }
          },
          primary: {
            DEFAULT: { value: '{colors.primary.500}' },
            darker: { value: '{colors.primary.400}' },
            dark: { value: '{colors.primary.300}' }
          },
          success: {
            DEFAULT: { value: '{colors.success.500}' },
            darker: { value: '{colors.success.400}' },
            dark: { value: '{colors.success.300}' },
            'container-dark': { value: '{colors.success.800}' },
            container: { value: '{colors.success.900}' },
            'container-low': { value: '{colors.success.950}' }
          },
          'on-success-container': { value: '{colors.success.300}' }
        },
        spacing: {
          'apple-pwa-pd': { value: '{spacing.5}' }
        }
      })
    }
  },

  // The output directory for your css system
  outdir: 'styled-system',

  strictPropertyValues: true
});
