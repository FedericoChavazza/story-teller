import RootstrapFont from "../../assets/RootstrapFont";
import RootstrapLogo from "../../assets/RootstrapLogo";
import styles from "./index.module.css";

const Logo = () => {
  return (
    <div className={styles.container}>
      <RootstrapLogo />
      <RootstrapFont />
    </div>
  );
};

export default Logo;
