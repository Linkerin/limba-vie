import { css } from '@/styled-system/css';

const styles = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 'token(spacing.4, 1rem)',
  listStyle: 'none',
  padding: '0rem'
});

function UnitsList({ children }: { children: React.ReactNode }) {
  return (
    <ol className={styles} role="list" aria-label="Units with word sets">
      {children}
    </ol>
  );
}

export default UnitsList;
