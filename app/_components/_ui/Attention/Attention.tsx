import { IconAlertTriangle } from '@tabler/icons-react';

import { containerStyles, headingStyles } from './Attention.styles';

interface AttentionProps extends React.ComponentPropsWithRef<'div'> {
  heading?: string;
}

function Attention({ className, heading, children, ...props }: AttentionProps) {
  return (
    <div className={containerStyles} {...props}>
      {heading?.length && heading?.length > 0 && (
        <div className={headingStyles}>
          <span>
            <IconAlertTriangle />
          </span>
          <p>{heading}</p>
        </div>
      )}
      {children}
    </div>
  );
}

export default Attention;
