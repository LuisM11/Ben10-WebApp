import { createContext, useContext, useReducer, useEffect } from "react";
import { useAliens } from "./AliensContext";
import { useAuth } from "./AuthContext"; // Importa el contexto de autenticación

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
  const { token, user } = useAuth(); // Obtiene el token y el usuario actual
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  useEffect(() => {
    if (currentAlien?.id) {
      fetchComments(currentAlien.id);
    }
  }, [currentAlien]);

  const apiRequest = async (endpoint, options = {}) => {
    const res = await fetch(`http://localhost:8080${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token en cada petición
        ...options.headers,
      },
    });

    if (!res.ok) {
      if (res.status === 403) {
        console.error("Token inválido o expirado. Redirigiendo al login...");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirige al login si la sesión expira
      }
      throw new Error(`Error en ${endpoint}: ${res.statusText}`);
    }

    if (res.status === 204) return null;
    return res.json();
  };

  const fetchComments = async (alienId) => {
    try {
      const data = await apiRequest(`/comments/alien/${alienId}`);
      dispatch({ type: "comments/loaded", payload: data });
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const fetchReplies = async (parentId) => {
    try {
      const data = await apiRequest(`/comments/replies/${parentId}`);
      data.forEach((reply) => {
        dispatch({ type: "comment/added", payload: reply });
      });
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
    }
  };

  const addComment = async (content, parentId = null) => {
    if (!user) {
      console.error("No hay usuario autenticado.");
      return;
    }

    try {
      console.log(user);
      console.log(content);
      const newComment = await apiRequest("/comments", {
        method: "POST",
        body: JSON.stringify({
          userId: user.id, // Ahora usa el ID del usuario autenticado
          alienId: currentAlien.id,
          content,
          parentId,
        }),
      });
      dispatch({ type: "comment/added", payload: newComment });
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const editComment = async (commentId, content) => {
    try {
      const updatedComment = await apiRequest(`/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({ content }),
      });
      dispatch({ type: "comment/updated", payload: updatedComment });
    } catch (error) {
      console.error("Error al editar comentario:", error);
    }
  };

  const removeComment = async (commentId) => {
    try {
      await apiRequest(`/comments/${commentId}`, { method: "DELETE" });
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
