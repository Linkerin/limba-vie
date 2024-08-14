import { defineConfig, defineTokens } from '@pandacss/dev';
import Spectrum, { createPalette } from '@snipshot/spectrum';

import { cardRecipe } from './theme/recipes';
import { keyframes } from './theme/keyframes';
import { semanticTokens } from './theme/semanticTokens';

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
      keyframes,
      recipes: { card: cardRecipe },
      tokens: defineTokens({
        colors: {
          background: { value: 'hsl(28, 33%, 97%)' },
          'background-darker': { value: 'hsl(28, 33%, 93%)' },
          'background-dark': { value: 'hsl(28, 33%, 86%)' },
          ...generateTokens('primary', primaryColor),
          ...generateTokens('secondary', secondaryColor),
          ...generateTokens('success', successColor)
        }
      }),
      semanticTokens
    }
  },

  // The output directory for your css system
  outdir: 'styled-system',

  strictPropertyValues: true
});
