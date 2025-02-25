import { useAliens } from "../contexts/AliensContext";
import styles from "./ButtonTransform.module.css";

function ButtonTransform({ selectedAlien }) {
  const { transformAlien } = useAliens();
  const handleTransform = () => {
    if (selectedAlien) {
      transformAlien(selectedAlien);
    }
  };
  console.log("desde buttons transform", selectedAlien.name);

  return (
    <button
      // className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      className={`${styles.neon__button} `}
      onClick={handleTransform}
    >
      <div className={styles.reloj} />
      <div className={styles.rombo}>
        <img src={`/${selectedAlien.name}.png`} />
      </div>
    </button>
  );
}

export default ButtonTransform;
