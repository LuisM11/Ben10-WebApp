import { createContext, useContext, useReducer, useEffect } from "react";
import { useAliens } from "./AliensContext";

const CommentsContext = createContext();

const initialState = {
  comments: [],
};

function commentsReducer(state, action) {
  switch (action.type) {
    case "comments/loaded":
      return { ...state, comments: action.payload };
    case "comment/added":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case "comment/updated":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment,
        ),
      };
    case "comment/deleted":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload,
        ),
      };
    default:
      throw new Error("Unknown action type");
  }
}

export function CommentsProvider({ children }) {
  const { currentAlien } = useAliens();
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  useEffect(() => {
    if (currentAlien?.id) {
      fetchComments(currentAlien.id);
    }
  }, [currentAlien]);

  const fetchComments = async (alienId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/comments/alien/${alienId}`,
      );
      const data = await res.json();
      dispatch({ type: "comments/loaded", payload: data });
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const fetchReplies = async (parentId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/comments/replies/${parentId}`,
      );
      if (!res.ok) throw new Error("No se pudieron obtener las respuestas.");
      const data = await res.json();
      data.forEach((reply) => {
        dispatch({ type: "comment/added", payload: reply });
      });
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
    }
  };

  const addComment = async (content, parentId = null) => {
    try {
      const res = await fetch("http://localhost:8080/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          alienId: currentAlien.id,
          content,
          parentId,
        }),
      });
      const newComment = await res.json();
      dispatch({ type: "comment/added", payload: newComment });
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const editComment = async (commentId, content) => {
    try {
      const res = await fetch(`http://localhost:8080/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const updatedComment = await res.json();
      dispatch({ type: "comment/updated", payload: updatedComment });
    } catch (error) {
      console.error("Error al editar comentario:", error);
    }
  };

  const removeComment = async (commentId) => {
    try {
      await fetch(`http://localhost:8080/comments/${commentId}`, {
        method: "DELETE",
      });
      dispatch({ type: "comment/deleted", payload: commentId });
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        comments: state.comments,
        addComment,
        fetchReplies,
        removeComment,
        editComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments debe usarse dentro de un CommentsProvider");
  }
  return context;
}
