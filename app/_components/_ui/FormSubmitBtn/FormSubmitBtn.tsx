'use client';

import { useFormStatus } from 'react-dom';

import Button from '../Button/Button';

function FormSubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      loading={pending}
      loadingText="Sending..."
    >
      Send report
    </Button>
  );
}

export default FormSubmitBtn;
