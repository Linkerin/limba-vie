import TipsNav from '../_components/TipsNav/TipsNav';

function TipsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TipsNav />
      {children}
    </>
  );
}

export default TipsLayout;
