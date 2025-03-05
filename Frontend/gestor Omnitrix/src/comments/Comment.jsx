import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import { useComments } from "../contexts/CommentsContext";
import { useAuth } from "../contexts/AuthContext";

const Comment = ({ comment }) => {
  const { comments, fetchReplies, addComment, editComment, removeComment } =
    useComments();
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const replies = comments.filter((c) => c.parentId === comment.id);
  const [showReplies, setShowReplies] = useState(replies.length > 0);

  useEffect(() => {
    if (showReplies) {
      const existingReplies = comments.filter((c) => c.parentId === comment.id);
      if (existingReplies.length === 0) {
        fetchReplies(comment.id);
      }
    }
  }, [showReplies, comment.id, fetchReplies, comments]);

  return (
    <div className="rounded-lg border border-[#8be308] bg-gray-800 p-4 shadow-md">
      <div className="flex items-center space-x-3">
        <img src="/user-icon.png" className="h-8 w-8 rounded-full" alt="user" />
        <div>
          <p className="font-semibold text-[#8be308]">{comment.username}</p>
          <p className="text-sm text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {!isEditing ? (
        <p className="mt-2 text-white">{comment.content}</p>
      ) : (
        <CommentForm
          submitLabel="Actualizar"
          initialText={comment.content}
          handleSubmit={(text) => {
            editComment(comment.id, text);
            setIsEditing(false);
          }}
        />
      )}

      {/* Acciones */}
      <div className="mt-2 flex space-x-4 text-sm">
        <button
          className="text-[#8be308] hover:underline"
          onClick={() => setIsReplying(!isReplying)}
        >
          Responder
        </button>
        <button
          className="text-[#8be308] hover:underline"
          onClick={() => setShowReplies((prev) => !prev)}
        >
          {showReplies ? "Ocultar respuestas" : "Ver respuestas"}
        </button>
        {(user.id === 1 || comment.userId === user.id) && (
          <>
            <button
              className="text-yellow-400 hover:underline"
              onClick={() => setIsEditing(!isEditing)}
            >
              Editar
            </button>
            <button
              className="text-red-500 hover:underline"
              onClick={() => removeComment(comment.id)}
            >
              Eliminar
            </button>
          </>
        )}
      </div>

      {/* Formulario para responder */}
      {isReplying && (
        <div className="mt-2">
          <CommentForm
            submitLabel="Responder"
            handleSubmit={(text) => {
              addComment(text, comment.id);
              setIsReplying(false);
              setShowReplies(true);
            }}
          />
        </div>
      )}

      {/* Mostrar respuestas */}
      {showReplies && replies.length > 0 && (
        <div className="ml-6 mt-2 border-l-2 border-[#8be308] pl-4">
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
