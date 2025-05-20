import React from 'react';
import { useState, useEffect } from "react";

interface CommentFormProps {
  handleSubmit: (text: string, parentId: string | null) => void;
  submitLabel: string;
  parentId: string | null;
}

const CommentForm: React.FC<CommentFormProps> = ({handleSubmit, submitLabel, parentId}) => {

  const [text, setText] = useState("");

  const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(text, parentId);
  };

  return (
    <form onSubmit={onSubmit}>
    <textarea
      className="comment-form-textarea"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <button className="comment-form-button">
      {submitLabel}
    </button>
  </form>
  );
};

export default CommentForm;