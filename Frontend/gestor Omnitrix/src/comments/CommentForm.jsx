import { useState } from "react";

const CommentForm = ({ submitLabel, handleSubmit, initialText = "" }) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="mt-2 space-y-2">
      <textarea
        className="w-full rounded-lg border-2 border-[#8be308] bg-gray-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8be308]"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <button
        className={`w-full rounded-lg px-4 py-2 text-white transition ${
          isTextareaDisabled
            ? "cursor-not-allowed bg-gray-500"
            : "bg-[#8be308] hover:bg-green-600"
        }`}
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CommentForm;
