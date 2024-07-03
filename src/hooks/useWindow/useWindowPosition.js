import { useState, useEffect } from "react";

const useWindowPosition = () => {
  const [position, setPosition] = useState({
    x: window.screenX,
    y: window.screenY,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResizeOrMove = () => {
      setPosition({
        x: window.screenX,
        y: window.screenY,
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResizeOrMove);
    window.addEventListener("move", handleResizeOrMove);

    return () => {
      window.removeEventListener("resize", handleResizeOrMove);
      window.removeEventListener("move", handleResizeOrMove);
    };
  }, []);

  return position;
};

export default useWindowPosition;
