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
      <label htmlFor="download-progress">
        Export your current progress for safekeeping.
      </label>
      <Button
        id="download-progress"
        css={actionBtnStyles}
        onClick={clickHandler}
        variant="primary"
      >
        Download progress
      </Button>
    </>
  );
}

export default ExportProgress;
