import { sectionStyles, textStyles } from './ErrorView.styles';

interface ErrorPageProps {
  children: React.ReactNode;
  heading: string;
  precedingElement?: React.ReactNode;
  text: string;
}

function ErrorView({
  children,
  heading,
  precedingElement,
  text
}: ErrorPageProps) {
  return (
    <section className={sectionStyles}>
      {precedingElement}
      <div>
        <h1>{heading}</h1>
        <p className={textStyles}>{text}</p>
      </div>
      {children}
    </section>
  );
}

export default ErrorView;
