import type { SystemStyleObject } from '@/styled-system/types';

export interface ButtonBaseProps {
  css?: SystemStyleObject;
  fadeAnimation?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: 'base' | 'primary' | 'secondary' | 'success' | 'text';
  vibrate?: boolean;
}
