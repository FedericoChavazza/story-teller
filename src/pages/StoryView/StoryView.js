import clsx from "clsx";
import React from "react";
import Button from "../../components/Button/Button";
import { useStory } from "../../context/StoryContext/StoryContext";
import styles from "./index.module.css";
import DOMPurify from "dompurify";

const StoryView = ({ handleGoBottom, storyLoading }) => {
  const {
    story: { title, story },
    isLoading,
    clearStory,
  } = useStory();

  const displayText = clsx({
    [styles.displayText]: !storyLoading && !isLoading && story,
  });

  const handleClickButton = () => {
    clearStory();
    handleGoBottom();
  };

  const sanitizedStory = DOMPurify.sanitize(story);

  return (
    <div className={styles.container}>
      <Button
        customClass={styles.landButton}
        onClick={handleClickButton}
        type="transparent"
      >
        go back!
      </Button>
      <div className={`${styles.textContainer} ${displayText}`}>
        <h1 className={styles.mainTitle}>Once upon a time...</h1>
        <h2 className={styles.title}>{title}</h2>
        <p
          className={styles.story}
          dangerouslySetInnerHTML={{ __html: sanitizedStory }}
        ></p>
      </div>
    </div>
  );
};

export default StoryView;
