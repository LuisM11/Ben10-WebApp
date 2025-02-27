import { useAliens } from "../../contexts/AliensContext";

function TransformationTimer() {
  const { remainingTime } = useAliens(); // Obtenemos el tiempo restante del contexto

  // Si el tiempo ya terminó, no mostrar nada
  if (remainingTime <= 0) return null;

  return (
    <div className="flex-w mt-2 text-center text-gray-300 md:text-lg">
      ⏳ Tiempo restante: <strong>{remainingTime} segundos</strong>
    </div>
  );
}

export default TransformationTimer;
