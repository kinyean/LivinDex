import React from 'react';
import { useState } from "react";
import "../../Styles/Content.css";

interface CommentFormProps {
  handleSubmit: (text: string, parentId: string | null) => void;
  submitLabel: string;
  parentId: string | null;
  hasCancelButton: boolean;
  handleCancel: () => void;
  initialText: string;
}

const CommentForm: React.FC<CommentFormProps> = ({handleSubmit, submitLabel, parentId, hasCancelButton, handleCancel, initialText}) => {

  const [text, setText] = useState(initialText);

  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(text, parentId);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
    <textarea
      className="comment-form-textarea"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <button className="comment-form-button" disabled={isTextareaDisabled}>
      {submitLabel}
    </button>
    {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
  </form>
  );
};

export default CommentForm;