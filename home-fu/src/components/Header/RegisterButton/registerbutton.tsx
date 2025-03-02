import React from "react";
import styles from "./registerbutton.module.scss";
import menuIcon from "../../../assets/icons/iconMenu.svg"
import userIcon from "../../../assets/icons/iconUser.svg"

type RegisterButtonProps = {
    onClick?: () => void; 
  };
  
  const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
    return (
      <button className={styles.registerbutton} onClick={onClick}>
        <img src={menuIcon} className={styles.icon} />
        <img src={userIcon} className={styles.icon} />
      </button>
    );
  };
  export default RegisterButton;