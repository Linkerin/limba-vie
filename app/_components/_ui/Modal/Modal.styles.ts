import { css } from '@/styled-system/css';

export const containerStyles = css.raw({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: '0rem',
  zIndex: 2
});

export const cardStyles = css.raw({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.3, 0.75rem)',
  backgroundColor: 'primary.container-low',
  border: '2px solid token(colors.primary.darker)',
  borderRadius: 'sm',
  padding:
    'token(spacing.4, 1rem) token(spacing.4, 1rem) token(spacing.2, 0.5rem)',
  width: 'min(768px, 80dvw)'
});

export const closeBtnStyles = css({
  alignSelf: 'flex-end',
  aspectRatio: '1 / 1',
  fontSize: 'xl',
  padding: '0rem'
});
