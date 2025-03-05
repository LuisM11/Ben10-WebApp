"use client";

import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import styles from "./ScrollLinked.module.css";
export default function ScrollLinked({ aliens, onSelect, selectedAlien }) {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  useEffect(() => {
    if (ref.current && selectedAlien) {
      const container = ref.current;
      const selectedItem = container.querySelector(
        `[data-id="${selectedAlien.id}"]`,
      );

      if (selectedItem) {
        const containerWidth = container.offsetWidth;
        const itemLeft = selectedItem.offsetLeft;
        const itemWidth = selectedItem.offsetWidth;

        const scrollPosition = itemLeft - containerWidth / 2 + itemWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [selectedAlien]);

  return (
    <div className="lg:max-w-[500px] relative w-full max-w-[350px] md:max-w-[400px]">
      <svg
        className="absolute -left-4 -top-16 h-20 w-20 -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="fill-none stroke-gray-700 stroke-[10%]"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          className="fill-none stroke-[#8be308] stroke-[10%]"
          style={{ pathLength: scrollXProgress }}
        />
      </svg>

      <motion.ul
        ref={ref}
        style={{ maskImage }}
        className={`${styles["scrollbar-thin"]} flex h-[170px] gap-6 overflow-x-scroll px-5 py-4`}
      >
        {aliens.map((alien) => (
          <motion.li
            key={alien.id}
            data-id={alien.id}
            className={`h-[120px] w-[120px] flex-none cursor-pointer overflow-hidden rounded-full border-4 transition-all duration-300 ${
              selectedAlien?.id === alien.id
                ? "scale-110 border-[#8be308] shadow-lg shadow-green-500/30"
                : "border-gray-200 opacity-80 hover:opacity-100"
            }`}
            onClick={() => onSelect(alien)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={alien.imageUrl}
              alt={alien.name}
              className="h-full w-full object-cover"
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)`,
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, #000, #000 80%, #000 90%, transparent)`,
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, transparent, #000 10%, #000 20%, #000)`,
      );
    } else {
      animate(
        maskImage,
        `linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)`,
      );
    }
  });

  return maskImage;
}
