// import { useAliens } from "../contexts/AliensContext";
// import styles from "./ButtonTransform.module.css";
//
// function ButtonTransform({ selectedAlien }) {
//   const { transformAlien } = useAliens();
//   const handleTransform = () => {
//     if (selectedAlien) {
//       transformAlien(selectedAlien);
//     }
//   };
//
//   return (
//     <button
//       // className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
//       className={`${styles.neon__button} `}
//       onClick={handleTransform}
//     >
//       <div className={styles.reloj} />
//       <div className={styles.rombo}>
//         <img src={`/${selectedAlien.name}.png`} />
//       </div>
//     </button>
//   );
// }
//
// export default ButtonTransform;

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

