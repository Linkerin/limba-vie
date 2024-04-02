import ActionBtn from '../../ActionBtn/ActionBtn';

import styles from './Actions.module.css';

function Actions({ setCurrWord }: { setCurrWord: () => void }) {
  const actionClickHandler = (e: React.MouseEvent) => {
    setCurrWord();
  };

  return (
    <div className={styles.actions}>
      <ActionBtn variant="repeat" onClick={actionClickHandler} />
      <ActionBtn variant="learned" onClick={actionClickHandler} />
    </div>
  );
}

export default Actions;
