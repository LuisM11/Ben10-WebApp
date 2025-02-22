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
        favoritos: state.favoritos.filter(
          (fav) => fav.alien_id !== action.payload,
        ),
      };

    default:
      throw new Error("Unknown action type");
  }
}

function AliensProvider({ children }) {
  const [
    {
      aliens,
      currentAlien,
      error,
      transformedAlien,
      remainingTime,
      favoritos,
      state,
      allCharacteristicsFavs,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getAlien = useCallback(
    async function getAlien(id) {
      console.log("id desde getAlien", id);
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
  // TODO Descomentar cuando transformaciones estén listas

  // const transformAlien = async (alien) => {
  //   try {
  //     // 1️⃣ Primero, verificamos si ya hay una transformación activa
  //     const resCheck = await fetch(`${BASE_URL}/transformaciones`);
  //     const dataCheck = await resCheck.json();

  //     if (dataCheck.length > 0) {
  //       console.warn(
  //         "⚠ Ya hay una transformación activa. No puedes iniciar otra.",
  //       );
  //       return; // ⛔ Evita que se cree otra transformación
  //     }

  //     // 2️⃣ Generar un tiempo de transformación aleatorio (30 a 90 segundos)
  //     const tiempoTransformacion = alien.transformationDurationSeconds;

  //     const nuevaTransformacion = {
  //       alien_id: alien.id,
  //       tiempoTransformacion,
  //       estado: true, // Indica que la transformación está activa
  //     };

  //     // 3️⃣ Enviamos la transformación a JSON Server
  //     const res = await fetch(`${BASE_URL}/transformaciones`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(nuevaTransformacion),
  //     });

  //     if (!res.ok) throw new Error("Error al transformar");

  //     const data = await res.json(); // JSON Server devuelve el objeto creado con un ID único

  //     dispatch({
  //       type: "alien/transformed",
  //       payload: { ...alien, tiempoTransformacion, transformacionId: data.id },
  //     });
  //   } catch (error) {
  //     console.error("Error al transformar el alien:", error);
  //   }
  // };

  // const resetTransformation = () => {
  //   dispatch({ type: "alien/resetTransformation" });
  // };

  // TODO Descomentar cuando transformaciones estén listas

  // useEffect(() => {
  //   const fetchTransformacionActiva = async () => {
  //     try {
  //       const res = await fetch(`${BASE_URL}/transformaciones`);
  //       const data = await res.json();

  //       if (data.length > 0) {
  //         const transformacion = data[0]; // Tomar la primera transformación activa
  //         const alienRes = await fetch(
  //           `http://localhost:9000/aliens/${transformacion.alien_id}`,
  //         );
  //         const alienData = await alienRes.json();

  //         dispatch({
  //           type: "alien/transformed",
  //           payload: {
  //             ...alienData,
  //             tiempoTransformacion: transformacion.tiempoTransformacion,
  //           },
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener la transformación activa");
  //     }
  //   };

  //   fetchTransformacionActiva();
  // }, []);

  // TODO Descomentar cuando transformaciones estén listas

  // const resetTransformation = async () => {
  //   try {
  //     // Obtener la transformación activa
  //     const res = await fetch("http://localhost:9000/transformaciones");
  //     const data = await res.json();

  //     if (data.length === 0) {
  //       console.warn("⚠ No hay transformación activa para eliminar.");
  //       return;
  //     }

  //     const transformacionId = data[0].id; // Tomamos el ID de la primera transformación activa

  //     // Eliminar la transformación correcta
  //     const deleteRes = await fetch(
  //       `http://localhost:9000/transformaciones/${transformacionId}`,
  //       {
  //         method: "DELETE",
  //       },
  //     );

  //     if (!deleteRes.ok) throw new Error("Error al detener la transformación");

  //     dispatch({ type: "alien/resetTransformation" });
  //   } catch (error) {
  //     console.error("Error al detener la transformación:", error);
  //   }
  // };

  // TODO Descomentar cuando transformaciones estén listas

  // useEffect(() => {
  //   if (transformedAlien && remainingTime > 0) {
  //     const timer = setInterval(() => {
  //       dispatch({ type: "timer/update", payload: remainingTime - 1 });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }

  //   if (remainingTime === 0 && transformedAlien) {
  //     resetTransformation(); // Si el tiempo llega a 0, se detiene automáticamente
  //   }
  // }, [remainingTime, transformedAlien]);

  const addToFavorites = async (alien, usuarioId) => {
    try {
      // const resCheck = await fetch(
      //   `${BASE_URL}/users/ben10/favorites/${alien.id}`,
      // );
      // const dataCheck = await resCheck.json();

      // if (dataCheck.length > 0) {
      //   console.warn("⚠ El alien ya está en favoritos.");
      //   return;
      // }

      console.log("alien", alien);

      // const nuevoFavorito = {
      //   id: alien.id,
      //   name: alien.name,
      //   description: alien.description,
      //   imageUrl: alien.imageUrl,
      // };

      const res = await fetch(`${BASE_URL}/users/ben10/favorites/${alien.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // body: JSON.stringify(nuevoFavorito),
      });

      console.log(res);

      if (!res.ok) throw new Error("Error al agregar a favoritos");

      const data = await res.json(); // ✅ Obtenemos el objeto con su ID único
      console.log("data", data);

      dispatch({
        type: "favoritos/agregado",
        payload: {
          favoritoId: data.id,
          usuario_id: usuarioId,
          alien_id: alien.id,
          name: alien.name, // ✅ Añadir el nombre del alien
          imageUrl: alien.imageUrl, // ✅ Añadir la imagen del alien
        },
      });
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const removeFromFavorites = async (alien_id) => {
    //2
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

  //cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        console.log("Usuarios cargados:", data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const fetchFavoritos = async () => {
  //     try {
  //       const usuarioId = 1; // 🔹 Simulación de usuario (en un backend real, se tomaría del contexto de autenticación)

  //       const res = await fetch(
  //         `http://localhost:9000/favoritos?usuario_id=${usuarioId}`,
  //       );
  //       const data = await res.json();

  //       dispatch({ type: "favoritos/cargados", payload: data });
  //     } catch (error) {
  //       console.error("Error al obtener favoritos:", error);
  //     }
  //   };

  //   fetchFavoritos();
  // }, []);

  // TODO Descomentar cuando transformaciones estén listas

  // const fetchBen10Favorites = async () => {
  //   try {
  //     const favRes = await fetch(`${BASE_URL}/favoritos?usuario_id=1`);
  //     const favData = await favRes.json();

  //     if (favData.length === 0) {
  //       console.warn("⚠ Ben 10 no tiene favoritos.");
  //       dispatch({ type: "favoritos/cargados", payload: [] });
  //       return;
  //     }

  //     const alienIds = favData.map((fav) => fav.id);
  //     const alienPromises = alienIds.map((id) =>
  //       fetch(`${BASE_URL}/aliens/${id}`).then((res) => res.json()),
  //     );

  //     const aliensData = await Promise.all(alienPromises);
  //     dispatch({ type: "favoritos/cargados", payload: aliensData });
  //   } catch (error) {
  //     console.error("Error al obtener los favoritos de Ben 10:", error);
  //   }
  // };

  // ⬇️ Aquí colocamos el useEffect
  // useEffect(() => {
  //   fetchBen10Favorites();
  // }, []);

  // const fetchBen10User = async () => {
  //   try {
  //     const res = await fetch(`${BASE_URL}/users?username=ben10`);
  //     const data = await res.json();

  //     if (data.length === 0) {
  //       console.error("⚠ Usuario Ben 10 no encontrado.");
  //       return null;
  //     }

  //     return data[0]; // Retornamos solo el primer usuario encontrado
  //   } catch (error) {
  //     console.error("Error al obtener el usuario Ben 10:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   fetchBen10User().then((user) => {
  //     if (user) {
  //       console.log("Usuario cargado:", user);
  //     }
  //   });
  // }, []);

  return (
    <AliensContext.Provider
      value={{
        currentAlien,
        getAlien,
        transformedAlien,
        remainingTime,
        // transformAlien,
        // resetTransformation,
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
  // console.log(context);
  return context;
}

export { AliensProvider, useAliens };
