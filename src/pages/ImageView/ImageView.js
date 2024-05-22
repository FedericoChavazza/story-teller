import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Button from "../../components/Button/Button";
import styles from "./index.module.css";

const ImageView = ({ selectedImage, onClose, isImageViewVisible }) => {
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const [animation, setAnimation] = useState(styles["fade-in"]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isInitialMount.current) {
      setAnimation(styles["fade-out"]);
      const timeoutId = setTimeout(() => {
        setCurrentImage(selectedImage);
        setAnimation(styles["fade-in"]);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
    isInitialMount.current = false;
  }, [selectedImage]);

  useEffect(() => {
    if (isImageViewVisible) {
      setAnimation(styles["fade-in"]);
    }
  }, [isImageViewVisible]);

  const handleClose = () => {
    setAnimation(styles["fade-out"]);
    setTimeout(onClose, 300);
  };

  const imageClassName = clsx(styles.image, animation);
  const containerClassName = clsx(styles.container, animation, {
    [styles.hideImage]: !isImageViewVisible,
    [styles.showImage]: isImageViewVisible,
  });

  return (
    <div className={containerClassName}>
      <Button
        type="transparent"
        customClass={styles.timesButton}
        onClick={handleClose}
      >
        x
      </Button>
      {currentImage && (
        <img
          key={currentImage}
          className={imageClassName}
          src={currentImage}
          alt="Displayed"
        />
      )}
    </div>
  );
};

export default ImageView;
