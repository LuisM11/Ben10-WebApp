import { useAliens } from "../../contexts/AliensContext";
import { useState, useEffect } from "react";

function TransformationTimer() {
  const { remainingTime } = useAliens(); // Get remaining time from context
  const [flashState, setFlashState] = useState(false);

  useEffect(() => {
    if (remainingTime <= 10 && remainingTime > 0) {
      const flashInterval = setInterval(() => {
        setFlashState((prev) => !prev);
      }, 500);

      return () => clearInterval(flashInterval);
    } else {
      setFlashState(false);
    }
  }, [remainingTime]);

  if (remainingTime <= 0) return null;

  const getTimerColor = () => {
    if (remainingTime <= 10) return flashState ? "text-red-500" : "text-white";
    if (remainingTime <= 30) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="mt-3 flex w-full flex-col items-center">
      <div
        className={`${getTimerColor()} flex flex-col items-center transition-colors duration-300`}
      >
        <span className="text-5xl font-bold md:text-7xl">{remainingTime}</span>
      </div>

      <div className="mt-2 h-2 w-2/3 max-w-xs overflow-hidden rounded-full border border-green-500 bg-gray-700">
        <div
          className="h-full bg-green-500 transition-all duration-1000 ease-linear"
          style={{ width: `${(remainingTime / 60) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default TransformationTimer;
