import { errorStyles, sectionStyles } from './ErrorMessage.styles';

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <section className={sectionStyles}>
      <p>Ooops, here is an error:</p>
      <p className={errorStyles}>&apos;{children}&apos;</p>
      <p>Please, try again</p>
    </section>
  );
}

export default ErrorMessage;
