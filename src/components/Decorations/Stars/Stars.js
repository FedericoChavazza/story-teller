import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";

const Stars = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const count = 100;
    for (let i = 0; i < count; i++) {
      let star = document.createElement("i");
      let x = Math.floor(Math.random() * window.innerWidth);
      let duration = Math.random() * 1;
      let h = Math.random() * 100;

      star.style.left = `${x}px`;
      star.style.width = `1px`;
      star.style.height = `${50 + h}px`;
      star.style.animationDuration = `${duration}s`;

      sceneRef.current.appendChild(star);
      i++;
    }
  }, []);

  return <div ref={sceneRef} className={styles.scene}></div>;
};

export default Stars;
