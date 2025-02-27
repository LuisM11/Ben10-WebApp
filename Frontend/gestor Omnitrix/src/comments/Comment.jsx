import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import { useComments } from "../contexts/CommentsContext";
import { useAuth } from "../contexts/AuthContext";

const Comment = ({ comment }) => {
  const { comments, fetchReplies, addComment, editComment, removeComment } =
    useComments();
  const { user } = useAuth(); // Obtiene el token y el usuario actual

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  // Inicializamos showReplies en true si ya existen respuestas en el estado global
  const replies = comments.filter((c) => c.parentId === comment.id);
  const [showReplies, setShowReplies] = useState(replies.length > 0);

  // Al activar la visualización de respuestas, si aún no se han cargado, las buscamos
  useEffect(() => {
    if (showReplies) {
      const existingReplies = comments.filter((c) => c.parentId === comment.id);
      if (existingReplies.length === 0) {
        fetchReplies(comment.id);
      }
    }
  }, [showReplies, comment.id, fetchReplies, comments]);

  return (
    <div className="border-b p-2">
      <div className="flex items-center space-x-2">
        <img src="/user-icon.png" className="h-8 w-8 rounded-full" alt="user" />
        <div>
          <p className="font-semibold text-black">{comment.username}</p>
          <p className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {!isEditing ? (
        <p className="mt-2 text-black">{comment.content}</p>
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
      <div className="mt-2 flex space-x-4 text-sm text-blue-500">
        <button onClick={() => setIsReplying(!isReplying)}>Responder</button>
        <button onClick={() => setShowReplies((prev) => !prev)}>
          {showReplies ? "Ocultar respuestas" : "Ver respuestas"}
        </button>
        {(user.id === 1 || comment.userId === user.id) && (
          <button onClick={() => setIsEditing(!isEditing)}>Editar</button>
        )}
        {(user.id === 1 || comment.userId === user.id) && (
          <button
            onClick={() => removeComment(comment.id)}
            className="text-red-500"
          >
            Eliminar
          </button>
        )}
      </div>

      {/* Formulario para responder */}
      {isReplying && (
        <CommentForm
          submitLabel="Responder"
          handleSubmit={(text) => {
            addComment(text, comment.id);
            setIsReplying(false);
            // Al agregar una respuesta, forzamos que se muestren inmediatamente
            setShowReplies(true);
          }}
        />
      )}

      {/* Mostrar respuestas a partir del estado global */}
      {showReplies && replies.length > 0 && (
        <div className="ml-6 mt-2">
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
