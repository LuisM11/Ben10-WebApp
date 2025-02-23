import { useAliens } from "../../contexts/AliensContext";

function TransformationTimer() {
  const { remainingTime } = useAliens(); // Obtenemos el tiempo restante del contexto
  console.log(remainingTime);

  // Si el tiempo ya terminó, no mostrar nada
  if (remainingTime <= 0) return null;
  console.log(remainingTime);

  return (
    <div className="mt-2 p-2 text-center text-gray-300">
      ⏳ Tiempo restante: <strong>{remainingTime} segundos</strong>
    </div>
  );
}

export default TransformationTimer;
