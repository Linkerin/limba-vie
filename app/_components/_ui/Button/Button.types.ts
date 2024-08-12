import type { SystemStyleObject } from '@/styled-system/types';

export interface ButtonBaseProps {
  css?: SystemStyleObject;
  fadeAnimation?: boolean;
  variant?: 'base' | 'primary' | 'secondary' | 'success';
  vibrate?: boolean;
}
