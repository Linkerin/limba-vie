import './grammar.css';

export default function GrammarLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <article className="grammar-container">{children}</article>;
}
