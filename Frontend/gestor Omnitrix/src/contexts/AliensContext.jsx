import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext"; // 🔥 Importar el contexto de autenticación

const BASE_URL = "http://localhost:8080";
const AliensContext = createContext();

const initialState = {
  aliens: [],
  currentAlien: {},
  transformedAlien: null,
  remainingTime: 0, // ⏳ Estado del temporizador
  favoritos: [], // ✅ Estado de favoritos
  allCharacteristicsFavs: [],
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "alien/loaded":
      return { ...state, currentAlien: action.payload };

    case "alien/transformed":
      return {
        ...state,
        transformedAlien: action.payload,
        remainingTime: action.payload.tiempoTransformacion,
      };

    case "alien/resetTransformation":
      return { ...state, transformedAlien: null, remainingTime: 0 };

    case "timer/update":
      return { ...state, remainingTime: action.payload };

    case "favoritos/cargados":
      return { ...state, favoritos: action.payload };

    case "favoritos/agregado":
      return { ...state, favoritos: [...state.favoritos, action.payload] };

    case "favoritos/eliminado":
      return {
        ...state,
        favoritos: state.favoritos.filter((fav) => fav.id !== action.payload),
      };

    default:
      throw new Error("Unknown action type");
  }
}

function AliensProvider({ children }) {
  const { token } = useAuth(); // 🔥 Obtener el token del contexto de autenticación
  const [
    { currentAlien, transformedAlien, remainingTime, favoritos, state },
    dispatch,
  ] = useReducer(reducer, initialState);

  // 🔥 Función centralizada para peticiones a la API con token
  const apiRequest = useCallback(
    async (endpoint, options = {}) => {
      if (!token) {
        console.warn(
          "🔴 Intento de solicitud sin token. Evitando la petición...",
        );
        return null;
      }

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.error(
            "🔴 Token inválido o expirado. Redirigiendo al login...",
          );
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        throw new Error(`Error en ${endpoint}: ${res.statusText}`);
      }

      return res.json();
    },
    [token], // Only depends on token changes
  );

  const fetchActiveTransformation = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/transformations/active`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // 📌 Si la API devuelve 404, resetea el estado y detiene la ejecución
      if (res.status === 404) {
        console.warn("⚠ No hay transformación activa.");
        dispatch({ type: "alien/resetTransformation" });
        return; // ❌ Evita que el código siga ejecutándose innecesariamente
      }

      if (!res.ok) {
        throw new Error(`Error en /transformations/active: ${res.statusText}`);
      }

      const data = await res.json();

      const storedStartTime = localStorage.getItem("transformationStartTime");
      const storedDuration = localStorage.getItem("transformationDuration");

      if (!data || !data.alienId) {
        console.warn("⚠ La transformación activa no tiene un alienId válido.");
        return;
      }

      const data2 = await apiRequest(`/aliens/${data.alienId}`);

      if (storedStartTime && storedDuration) {
        const elapsedTime = Math.floor((Date.now() - storedStartTime) / 1000);
        const remainingTime = Math.max(0, storedDuration - elapsedTime);

        dispatch({
          type: "alien/transformed",
          payload: {
            ...data2,
            tiempoTransformacion: data2.transformationDuration,
          },
        });
        dispatch({ type: "timer/update", payload: remainingTime });
      }
    } catch (error) {
      console.error("Error al obtener la transformación activa:", error);
    }
  }, [dispatch, token, apiRequest]); // 📌 Dependencias actualizadas
  // 📌 Agregar `apiRequest` y `token` como dependencias

  useEffect(() => {
    fetchActiveTransformation(); // 🔥 Restaurar la transformación y calcular el tiempo restante
  }, [fetchActiveTransformation]);

  const getAlien = useCallback(
    async function getAlien(id) {
      if (Number(id) === currentAlien.id) return;

      try {
        const data = await apiRequest(`/aliens/${id}`);
        dispatch({ type: "alien/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the alien...",
        });
      }
    },
    [currentAlien.id, apiRequest],
  );

  const transformAlien = async (alien) => {
    try {
      const tiempoTransformacion = 100;
      const startTime = Date.now();

      const data = await apiRequest(`/transformations/alien/${alien.id}`, {
        method: "POST",
      });

      localStorage.setItem("transformationStartTime", startTime);
      localStorage.setItem("transformationDuration", tiempoTransformacion);

      dispatch({
        type: "alien/transformed",
        payload: { ...alien, tiempoTransformacion, transformacionId: data.id },
      });
    } catch (error) {
      console.error("Error al transformar el alien:", error);
    }
  };

  const resetTransformation = useCallback(async () => {
    try {
      await apiRequest("/transformations/stop", { method: "POST" });
      dispatch({ type: "alien/resetTransformation" });
    } catch (error) {
      console.error("Error al detener la transformación:", error);
    }
  }, [apiRequest]);

  // 📌 Ahora `resetTransformation` ya está definido antes del `useEffect`
  useEffect(() => {
    if (transformedAlien && remainingTime > 0) {
      const timer = setInterval(() => {
        dispatch({ type: "timer/update", payload: remainingTime - 1 });
      }, 1000);

      return () => clearInterval(timer);
    }

    if (remainingTime === 0 && transformedAlien) {
      resetTransformation(); // ✅ Ahora sí puede llamarse sin error
    }
  }, [remainingTime, transformedAlien, resetTransformation]);

  const addToFavorites = async (alien) => {
    try {
      await apiRequest(`/users/ben10/favorites/${alien.id}`, {
        method: "POST",
      });

      getFavorites();
      dispatch({
        type: "favoritos/agregado",
        payload: { alien_id: alien.id },
      });
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const getFavorites = useCallback(async () => {
    if (!token) {
      console.warn("🔴 No se pudo obtener favoritos porque el token es nulo.");
      return;
    }

    try {
      const data = await apiRequest("/users/ben10/favorites");
      dispatch({ type: "favoritos/cargados", payload: data });
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  }, [dispatch, token, apiRequest]);

  const removeFromFavorites = async (alien_id) => {
    try {
      await apiRequest(`/users/ben10/favorites/${alien_id}`, {
        method: "DELETE",
      });
      dispatch({ type: "favoritos/eliminado", payload: alien_id });
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  return (
    <AliensContext.Provider
      value={{
        getFavorites,
        currentAlien,
        getAlien,
        transformedAlien,
        remainingTime,
        transformAlien,
        resetTransformation,
        favoritos,
        addToFavorites,
        removeFromFavorites,
        state,
      }}
    >
      {children}
    </AliensContext.Provider>
  );
}

function useAliens() {
  const context = useContext(AliensContext);
  if (!context) {
    throw new Error("useAliens must be used within an AliensProvider");
  }
  return context;
}

export { AliensProvider, useAliens };
