import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside/useOnClickOutside";
import dropdownIcon from "../../assets/dropdown.png";
import styles from "./index.module.css";

const Dropdown = ({ options, title, setSelectedValue, selectedValue }) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsActive(false));

  const toggleDropdown = () => setIsActive(!isActive);
  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setIsActive(false);
  };

  return (
    <div className={styles.container}>
      <label className={styles.title}>{title || "Title"}</label>
      <div
        className={`${styles.dropdown} ${isActive ? styles.selected : ""}`}
        ref={dropdownRef}
      >
        <div onClick={toggleDropdown} className={styles.dropdown_button}>
          {selectedValue.value}
          <img
            src={dropdownIcon}
            className={`${styles.icon} ${isActive ? styles.activeIcon : ""}`}
            alt="icon"
          />
        </div>
        {isActive && (
          <div className={styles.dropdown_content}>
            {options.map((option) => (
              <button
                key={option.key}
                className={styles.options}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
