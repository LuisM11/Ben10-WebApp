import {useAliens} from "../contexts/AliensContext";
import styles from "./ButtonTransform.module.css";

function ButtonTransform({selectedAlien}) {
  const {transformAlien} = useAliens();
  const handleTransform = () => {
    if (selectedAlien) {
      transformAlien(selectedAlien);
    }
  };

  return (
      <button
          className={styles.neon__button}
          onClick={handleTransform}
          style={{
            backgroundImage: `url(/OmnitrixInicial.png)`,
            backgroundSize: "150%",
            backgroundPosition: "center",
          }}
      >
        <div className={styles.reloj}/>
        <div className={styles.rombo}>
          <img
              className={styles.alienSilhouette}
              src={`/${selectedAlien.name}.png`}
              alt={selectedAlien.name}
          />
        </div>
      </button>
  );
}

export default ButtonTransform;

