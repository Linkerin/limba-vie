'use client';

import Button from '../../../../_ui/Button/Button';
import { generateProgressJson } from './exportUtils';

import { actionBtnStyles } from '../ProgressActions.styles';

const clickHandler = async () => {
  if (typeof document === 'undefined') return;

  generateProgressJson();
};

function ExportProgress() {
  return (
    <>
      <p>Export your current progress for safekeeping.</p>
      <Button css={actionBtnStyles} onClick={clickHandler} variant="primary">
        Download progress
      </Button>
    </>
  );
}

export default ExportProgress;
