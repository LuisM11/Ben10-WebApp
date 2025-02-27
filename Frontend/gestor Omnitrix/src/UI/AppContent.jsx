import { useState, useEffect } from "react";
import { getAliens } from "../services/apiAliens";
import Selector from "../features/Selector/Selector";
import Alien from "../features/Aliens/Alien";
import { useAuth } from "../contexts/AuthContext";

function AppContent() {
  const { token } = useAuth();
  const [aliens, setAliens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Solo llama a getAliens si hay un token válido
      getAliens(token)
        .then((data) => {
          setAliens(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching aliens:", error);
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) return <p>Cargando aliens...</p>;

  return (
    <div>
      <Selector aliens={aliens} />
      <Alien aliens={aliens} />
    </div>
  );
}

export default AppContent;
