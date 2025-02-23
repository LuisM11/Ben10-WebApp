import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useEffect,
} from "react";

const BASE_URL = "http://localhost:8080";
const AliensContext = createContext();

const initialState = {
  aliens: [],
  currentAlien: {},
  transformedAlien: null,
  remainingTime: 0, // ⏳ Estado del temporizador
  favoritos: [], // ✅ Agregamos el estado de favoritos
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

    // case "favoritos/agregado":
    //   return { ...state, favoritos: [...state.favoritos, action.payload] };
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
  const [
    { currentAlien, transformedAlien, remainingTime, favoritos, state },
    dispatch,
  ] = useReducer(reducer, initialState);

  const fetchActiveTransformation = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/transformations/active`);

      const data = await res.json();

      const storedStartTime = localStorage.getItem("transformationStartTime");
      const storedDuration = localStorage.getItem("transformationDuration");

      if (data.error) {
        console.warn("⚠ No hay transformación activa.");
        return;
      }

      const res2 = await fetch(`${BASE_URL}/aliens/${data.alienId}`);
      if (!res2.ok) throw new Error("Error al obtener alien transformado");

      const data2 = await res2.json();

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
  }, [dispatch]);

  useEffect(() => {
    fetchActiveTransformation(); // 🔥 Restaurar la transformación y calcular el tiempo restante
  }, [fetchActiveTransformation]);

  const getAlien = useCallback(
    async function getAlien(id) {
      if (Number(id) === currentAlien.id) return;

      try {
        const res = await fetch(`${BASE_URL}/aliens/${id}`);
        const data = await res.json();
        dispatch({ type: "alien/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the alien...",
        });
      }
    },
    [currentAlien.id],
  );

  const transformAlien = async (alien) => {
    try {
      const tiempoTransformacion = alien.transformationDuration;
      const startTime = Date.now(); // ⏳ Guardamos la hora actual en milisegundos

      const res = await fetch(`${BASE_URL}/transformations/alien/${alien.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Error al transformar");

      const data = await res.json();

      // Guardamos en localStorage la hora de inicio y la duración
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

  useEffect(() => {
    if (transformedAlien && remainingTime > 0) {
      const timer = setInterval(() => {
        dispatch({ type: "timer/update", payload: remainingTime - 1 });
      }, 1000);

      return () => clearInterval(timer);
    }

    if (remainingTime === 0 && transformedAlien) {
      resetTransformation(); // Si el tiempo llega a 0, se detiene automáticamente
    }
  }, [remainingTime, transformedAlien]);

  const resetTransformation = async () => {
    try {
      // Obtener la transformación activa
      const res = await fetch(`${BASE_URL}/transformations/active`);
      const data = await res.json();

      if (data.error) {
        console.warn("⚠ No hay transformación activa para eliminar.");
        return;
      }

      // const transformacionId = data[0].id; // Tomamos el ID de la primera transformación activa

      // Eliminar la transformación correcta
      const deleteRes = await fetch(`${BASE_URL}/transformations/stop`, {
        method: "POST",
      });

      if (!deleteRes.ok) throw new Error("Error al detener la transformación");

      dispatch({ type: "alien/resetTransformation" });
    } catch (error) {
      console.error("Error al detener la transformación:", error);
    }
  };

  // TODO Descomentar cuando transformaciones estén listas

  const addToFavorites = async (alien) => {
    try {
      const res = await fetch(`${BASE_URL}/users/ben10/favorites/${alien.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Error al agregar a favoritos");

      // 🔥 En lugar de modificar el estado manualmente, refrescamos la lista de favoritos desde la API
      getFavorites();
      dispatch({
        type: "favoritos/agregado",
        payload: {
          alien_id: alien.id,
        },
      });
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const getFavorites = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/ben10/favorites`);
      if (!res.ok) throw new Error("Error al obtener favoritos");

      const data = await res.json();

      dispatch({ type: "favoritos/cargados", payload: data });
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  }, [dispatch]);

  const removeFromFavorites = async (alien_id) => {
    try {
      const res = await fetch(`${BASE_URL}/users/ben10/favorites/${alien_id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar de favoritos");

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
        favoritos, // ✅ Exponer favoritos en el contexto
        addToFavorites, // ✅ Exponer la función para agregar a favoritos
        removeFromFavorites, // ✅ Exponer la función para eliminar de favoritos
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
