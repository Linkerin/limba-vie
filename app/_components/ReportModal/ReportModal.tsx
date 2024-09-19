'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { useFormState } from 'react-dom';
import { IconFlag2 } from '@tabler/icons-react';

import Button from '../_ui/Button/Button';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import type { ModalState } from '../_ui/Modal/Modal';
import FormSubmitBtn from '../_ui/FormSubmitBtn/FormSubmitBtn';
import { recordUserReport } from '@/app/_services/actions';
import SuccessMessage from './SuccessMessage/SuccessMessage';
import type { Tables } from '@/app/_lib/supabase.types';

import {
  btnStyles,
  fieldsetStyles,
  formStyles,
  hiddenInput,
  radioInputStyles,
  radioLabelStyles,
  textareaContainerStyles,
  textareaStyles
} from './ReportModal.styles';

const Modal = dynamic(() => import('../_ui/Modal/Modal'));

interface ReportModalBaseProps {
  wordCheck?: boolean;
}

interface ReportModalWordProps {
  wordId: Tables<'words'>['id'];
  articleId?: undefined;
}

interface ReportModalArticleProps {
  articleId: string;
  wordId?: undefined;
}

type ReportModalProps = ReportModalBaseProps &
  (ReportModalWordProps | ReportModalArticleProps);

const initialFormState = {
  status: 'idle',
  message: ''
};

function ReportModal({ articleId, wordId, wordCheck }: ReportModalProps) {
  const [modalState, setModalState] = useState<ModalState>('CLOSE');
  const [formState, formAction] = useFormState(
    recordUserReport,
    initialFormState
  );

  const closeHandler = useCallback(() => setModalState('CLOSE'), []);

  return (
    <>
      <Button
        css={btnStyles}
        onClick={() => setModalState('SHOW_MODAL')}
        variant="text"
      >
        <IconFlag2 />
      </Button>
      <Modal state={modalState} closeHandler={closeHandler}>
        {formState.status === 'success' && (
          <SuccessMessage message={formState.message} onClick={closeHandler} />
        )}
        {formState.status !== 'success' && (
          <form className={formStyles} action={formAction}>
            <fieldset className={fieldsetStyles}>
              <legend>
                What is wrong?<sup>*</sup>
              </legend>
              <label className={radioLabelStyles}>
                <input
                  className={radioInputStyles}
                  type="radio"
                  id="incorrect_ro"
                  name="type"
                  value="incorrect_ro"
                />
                Incorrect Romanian content
              </label>

              <label className={radioLabelStyles}>
                <input
                  className={radioInputStyles}
                  type="radio"
                  id="incorrect_en"
                  name="type"
                  value="incorrect_en"
                />
                Incorrect English content
              </label>

              <label className={radioLabelStyles}>
                <input
                  className={radioInputStyles}
                  type="radio"
                  id="offensive"
                  name="type"
                  value="offensive"
                />
                Offensive or inappropriate content
              </label>

              <label className={radioLabelStyles}>
                <input
                  className={radioInputStyles}
                  type="radio"
                  id="image_audio"
                  name="type"
                  value="image_audio"
                />
                Incorrect audio or image
              </label>

              {wordCheck && (
                <label className={radioLabelStyles}>
                  <input
                    className={radioInputStyles}
                    type="radio"
                    id="answer"
                    name="type"
                    value="answer"
                  />
                  My answer is correct
                </label>
              )}

              <label className={radioLabelStyles}>
                <input
                  className={radioInputStyles}
                  type="radio"
                  id="other"
                  name="type"
                  value="other"
                />
                Other issues
              </label>
            </fieldset>
            <section className={textareaContainerStyles}>
              <label htmlFor="comment">Additional information:</label>
              <textarea
                className={textareaStyles}
                id="comment"
                name="comment"
                placeholder="Type here"
                rows={4}
                autoComplete="off"
                maxLength={512}
              />
            </section>

            {formState.status === 'error' && (
              <ErrorMessage>{formState.message}</ErrorMessage>
            )}

            {wordId && (
              <input
                className={hiddenInput}
                type="text"
                id="word_id"
                name="word_id"
                value={wordId}
              />
            )}
            {articleId && (
              <input
                className={hiddenInput}
                type="text"
                id="grammar_article"
                name="grammar_article"
                value={articleId}
              />
            )}
            <FormSubmitBtn />
          </form>
        )}
      </Modal>
    </>
  );
}
export default ReportModal;
