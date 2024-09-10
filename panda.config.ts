import { defineConfig, defineTokens } from '@pandacss/dev';
import Spectrum, { createPalette } from '@snipshot/spectrum';

import { cardRecipe } from './theme/recipes';
import { GENDER_COLORS } from './app/_lib/constants';
import { keyframes } from './theme/keyframes';
import { semanticTokens } from './theme/semanticTokens';

const lightnessTokens = [30, 40, 50, 70, 80, 90, 95];
const primaryColor = new Spectrum('hsl', [237, 0.4, 0.5, 1]);
const secondaryColor = new Spectrum('hsl', [24, 0.8, 0.5, 1]);
const successColor = new Spectrum('hsl', [147, 0.25, 0.5, 1]);

function generateTokens(prefix: string, color: Spectrum) {
  const palette = createPalette(color);

  const tokens: Record<string, Record<'value', string>> = {};

  for (const token of lightnessTokens) {
    tokens[`${prefix}.${token * 10}`] = { value: palette[token].hex };
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
          'g.masculine': { value: GENDER_COLORS.m },
          'g.neutral': { value: GENDER_COLORS.n },
          'g.feminine': { value: GENDER_COLORS.f },
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
