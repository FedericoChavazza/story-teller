import { useEffect } from "react";

export default function useOnClickOutside(elementRef, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      event.preventDefault();
      if (
        elementRef &&
        elementRef.current &&
        !elementRef.current.contains(event.target)
      ) {
        callback();
      }
      return;
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [elementRef, callback]);
}
