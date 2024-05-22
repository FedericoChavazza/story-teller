import clsx from "clsx";
import React, { forwardRef } from "react";
import styles from "./index.module.css";

import rocket from "../../../assets/rocket.png";

const Rocket = forwardRef(({ storyLoading }, ref) => {
  const positionSticky = clsx({
    [styles.positionSticky]: !!storyLoading,
  });

  return (
    <div ref={ref} className={`${styles.rocket} ${positionSticky}`}>
      <img src={rocket} alt="rocket" />
    </div>
  );
});

export default Rocket;
