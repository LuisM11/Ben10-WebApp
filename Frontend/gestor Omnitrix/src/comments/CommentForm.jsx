import { useState } from "react";

const CommentForm = ({ submitLabel, handleSubmit, initialText = "" }) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  console.log("Comment form");
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="mt-2">
      <textarea
        className="text-bl w-full rounded border p-2 text-black"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CommentForm;
