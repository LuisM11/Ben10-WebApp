import { useRef, useEffect } from "react";
import { useAliens } from "../contexts/AliensContext";
import gsap from "gsap";
import styles from "./ButtonTransform.module.css";

function ButtonTransform({ selectedAlien }) {
  const { transformAlien } = useAliens();
  const transformSoundRef = useRef(new Audio("/sounds/proTransformAudio.mp3"));
  const alienImageRef = useRef(null);
  const buttonRef = useRef(null); // Referencia al botón

  useEffect(() => {
    // 🔥 Animación de pulso en el botón
    gsap.to(buttonRef.current, {
      scale: 1.1,
      boxShadow: "0px 0px 20px #8be308",
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const handleTransform = () => {
    if (selectedAlien) {
      transformSoundRef.current.currentTime = 0;
      transformSoundRef.current.play();

      // 🟢 Animación de vibración de la imagen del alien
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

      transformAlien(selectedAlien);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`${styles.neon__button} relative transition-all duration-300`}
      onClick={handleTransform}
    >
      <div className={styles.reloj} />
      <div className={styles.rombo}>
        <img
          ref={alienImageRef}
          src={`/${selectedAlien.name}.png`}
          alt={selectedAlien.name}
        />
      </div>
    </button>
  );
}

export default ButtonTransform;
