import { defineConfig, defineTokens } from '@pandacss/dev';
import Spectrum, { createPalette } from '@snipshot/spectrum';

import { cardRecipe } from './theme/recipes';
import { keyframes } from './theme/keyframes';
import { semanticTokens } from './theme/semanticTokens';

const primaryColor = new Spectrum('hsl', [237, 0.4, 0.5, 1]);
const secondaryColor = new Spectrum('hsl', [24, 0.8, 0.5, 1]);
const successColor = new Spectrum('hsl', [147, 0.25, 0.5, 1]);

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

  hash:
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
      ? { className: true, cssVar: false }
      : false,
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
          'g.masculine': { value: 'hsl(255, 58%, 40%)' },
          'g.neutral': { value: 'hsl(43, 100%, 44%)' },
          'g.feminine': { value: 'hsl(352, 60%, 47%)' },
          ...generateTokens('primary', primaryColor),
          ...generateTokens('secondary', secondaryColor),
          ...generateTokens('success', successColor)
        },
        sizes: {
          'img.size': { value: 'min(60dvw, 480px)' }
        }
      }),
      semanticTokens
    }
  },

  // The output directory for your css system
  outdir: 'styled-system',

  strictPropertyValues: true
});
