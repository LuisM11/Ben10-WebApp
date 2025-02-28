import { useRef } from "react";
import { useAliens } from "../contexts/AliensContext";
import gsap from "gsap";
import styles from "./ButtonTransform.module.css";

function ButtonTransform({ selectedAlien }) {
  const { transformAlien } = useAliens();
  const transformSoundRef = useRef(new Audio("/sounds/proTransformAudio.mp3")); // 🔊 Sonido
  const alienImageRef = useRef(null); // Imagen del alien que vibrará

  const handleTransform = () => {
    if (selectedAlien) {
      // 🔊 Reproducir sonido de transformación
      transformSoundRef.current.currentTime = 0;
      transformSoundRef.current.play();

      // 🟢 Animación de vibración
      gsap.fromTo(
        alienImageRef.current,
        { x: -5 },
        {
          x: 5,
          duration: 0.1,
          repeat: 10,
          yoyo: true,
          ease: "power1.inOut",
        },
      );

      // Ejecutar transformación
      transformAlien(selectedAlien);
    }
  };

  return (
    <button className={`${styles.neon__button}`} onClick={handleTransform}>
      <div className={styles.reloj} />
      <div className={styles.rombo}>
        <img
          ref={alienImageRef} // Referencia para la animación
          src={`/${selectedAlien.name}.png`}
          alt={selectedAlien.name}
        />
      </div>
    </button>
  );
}

export default ButtonTransform;
