import { css } from '@/styled-system/css';

const styles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: '100%',
  textAlign: 'center'
});

const textStyles = css({
  fontSize: 'token(fontSizes.xl, 1.25rem)'
});

interface ErrorPageProps {
  children: React.ReactNode;
  heading: string;
  precedingElement?: React.ReactNode;
  text: string;
}

function ErrorPage({
  children,
  heading,
  precedingElement,
  text
}: ErrorPageProps) {
  return (
    <section className={styles}>
      {precedingElement}
      <div>
        <h1>{heading}</h1>
        <p className={textStyles}>{text}</p>
      </div>
      {children}
    </section>
  );
}

export default ErrorPage;
