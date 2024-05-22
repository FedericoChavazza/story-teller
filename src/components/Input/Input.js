import clsx from "clsx";

import styles from "./index.module.css";

const Input = ({
  title,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
  name,
  errorMessage,
}) => {
  const errorClass = clsx({
    [styles.errorMessage]: !!errorMessage,
  });

  return (
    <div className={styles.container}>
      <label className={styles.title}>{title ?? "title"}</label>
      <input
        name={name}
        className={`${styles.input} ${errorClass}`}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        min={min}
        max={max}
      />
      {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
