import classNames from 'classnames';

import styles from './Skeleton.module.css';

type StyleObj = Pick<
  React.CSSProperties,
  'animationDuration' | 'height' | 'width'
>;

export interface SkeletonProps extends React.ComponentPropsWithoutRef<'div'> {
  animation?: 'pulse' | 'wave' | 'none';
  animationDuration?: React.CSSProperties['animationDuration'];
  fadeAnimation?: boolean;
  fitContent?: boolean;
  isLoaded?: boolean;
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'round' | 'none';
  type?: 'avatar' | 'button' | 'image';
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
}

function Skeleton({
  children,
  className,
  animationDuration,
  height,
  width,
  style,
  type,
  animation = 'pulse',
  fadeAnimation = true,
  fitContent = false,
  isLoaded = false,
  radius = 'xs',
  ...props
}: SkeletonProps) {
  let componentRadius = radius;
  switch (type) {
    case 'avatar':
      componentRadius = 'round';
      break;

    case 'image':
      componentRadius = 'xs';
      break;

    case 'button':
      componentRadius = 'md';
      break;

    default:
      break;
  }

  const styleObj: StyleObj = {};
  if (animationDuration) styleObj.animationDuration = animationDuration;
  if (height) styleObj.height = height;
  if (width) styleObj.width = width;

  return (
    <div
      className={classNames(
        styles.skeleton,
        styles[`radius-${componentRadius}`],
        { [styles.fit]: fitContent },
        {
          [styles[animation]]: !isLoaded && animation && animation !== 'none'
        },
        { [styles[`${type}`]]: type },
        { [styles.loaded]: isLoaded },
        { [styles['fade-animation']]: fadeAnimation },
        className
      )}
      style={{ ...styleObj, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Skeleton;
