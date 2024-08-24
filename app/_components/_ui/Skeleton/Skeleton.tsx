import { css } from '@/styled-system/css';
import type { SystemStyleObject } from '@/styled-system/types';

import { styles } from './Skeleton.styles';

export interface SkeletonProps extends React.ComponentPropsWithoutRef<'div'> {
  css?: SystemStyleObject;
  fadeAnimation?: boolean;
  fitContent?: boolean;
  isLoaded?: boolean;
}

function Skeleton({
  children,
  css: cssProp = {},
  fadeAnimation = true,
  fitContent = false,
  isLoaded = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={css(styles, cssProp)}
      {...props}
      data-loaded={isLoaded}
      data-fit={fitContent}
      data-fade={fadeAnimation}
    >
      {children}
    </div>
  );
}

export default Skeleton;
