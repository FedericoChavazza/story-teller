import clsx from "clsx";

import styles from "./index.module.css";

const Button = ({ children, onClick, type = "primary", customClass }) => {
  const classname = clsx({
    [styles.primary]: type === "primary",
    [styles.transparent]: type === "transparent",
  });

  return (
    <button className={`${classname} ${customClass} `} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
