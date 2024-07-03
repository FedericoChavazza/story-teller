import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "./index.module.css";
import FormView from "./pages/FormView/FormView";
import ImageView from "./pages/ImageView/ImageView";
import { dropdownData } from "./utils/utils";
import Rocket from "./components/Decorations/Rocket/Rocket";
import Stars from "./components/Decorations/Stars/Stars";
import StoryView from "./pages/StoryView/StoryView";
import { StoryProvider } from "./context/StoryContext/StoryContext";
import useWindowPosition from "./hooks/useWindow/useWindowPosition";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState(dropdownData[0]);
  const [isImageViewVisible, setIsImageViewVisible] = useState(true);
  const [storyLoading, setStoryLoading] = useState(false);
  const rocketRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const bottomRef = useRef(null);

  const windowPosition = useWindowPosition();

  const handleGenerateStory = () => {
    setStoryLoading(true);
    scrollToRocket();

    setTimeout(() => {
      setStoryLoading(false);
    }, 10000);
  };

  const handleGoBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRocket = () => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const totalScrollDuration = 10000;
    const startTime = performance.now();
    const startPosition = window.pageYOffset;
    const rocketPosition = rocketRef.current
      ? rocketRef.current.getBoundingClientRect().top + window.pageYOffset - 100
      : 0;

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = elapsedTime / totalScrollDuration;

      const easeInOutCubic = (time) =>
        time < 0.5
          ? 4 * time * time * time
          : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
      const distance =
        startPosition +
        (rocketPosition - startPosition) * easeInOutCubic(progress);
      window.scrollTo(0, distance);

      if (elapsedTime < totalScrollDuration) {
        scrollAnimationRef.current = requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, rocketPosition);
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    if (!storyLoading) {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    }
  }, [storyLoading]);

  useEffect(() => {
    handleGoBottom();
  }, [windowPosition]);

  useLayoutEffect(() => {
    handleGoBottom();
  }, []);

  return (
    <StoryProvider>
      <div className={styles.container}>
        <div className={styles.storyContainer}>
          <StoryView
            handleGoBottom={handleGoBottom}
            storyLoading={storyLoading}
          />
        </div>
        {storyLoading && (
          <>
            <Rocket ref={rocketRef} storyLoading={storyLoading} />
            <Stars />
          </>
        )}

        <div className={styles.formViewContainer} ref={bottomRef}>
          <ImageView
            selectedImage={selectedGenre.src}
            onClose={() => setIsImageViewVisible(false)}
            isImageViewVisible={isImageViewVisible}
          />
          <FormView
            setSelectedGenre={setSelectedGenre}
            isImageViewVisible={isImageViewVisible}
            setIsImageViewVisible={setIsImageViewVisible}
            onGenerateStory={handleGenerateStory}
          />
        </div>
      </div>
    </StoryProvider>
  );
};

export default App;
