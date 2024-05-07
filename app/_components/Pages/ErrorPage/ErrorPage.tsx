import styles from './ErrorPage.module.css';

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
    <section className={styles.section}>
      {precedingElement}
      <h1>{heading}</h1>
      <p>{text}</p>
      {children}
    </section>
  );
}

export default ErrorPage;
