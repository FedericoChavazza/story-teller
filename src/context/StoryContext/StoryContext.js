import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

const StoryContext = createContext();

export const useStory = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStory = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_STORY_FORM_BE,
        data: formData,
      });

      setStory(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearStory = () => {
    setStory("");
  };

  return (
    <StoryContext.Provider
      value={{ story, isLoading, error, fetchStory, clearStory }}
    >
      {children}
    </StoryContext.Provider>
  );
};
