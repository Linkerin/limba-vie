import { css } from '@/styled-system/css';

import Button from '../../_ui/Button/Button';

interface SuccessMessageProps {
  message: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const headingStyles = css({
  color: 'success.dark',
  fontSize: '2xl',
  marginBlock: 'token(spacing.4, 1rem)'
});

const btnStyles = css.raw({
  width: '100%'
});

function SuccessMessage({ message, onClick }: SuccessMessageProps) {
  return (
    <section>
      <h1 className={headingStyles}>{message}</h1>
      <Button css={btnStyles} onClick={onClick}>
        Close
      </Button>
    </section>
  );
}

export default SuccessMessage;
