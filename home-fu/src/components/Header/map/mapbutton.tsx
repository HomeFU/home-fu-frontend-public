import React from "react";
import styles from "./mapbutton.module.scss";
import { Map } from "lucide-react"; // библиотека картинка карты

type MapButtonProps = {
  onClick?: () => void; // Для обработки на будущее. 
};

const MapButton: React.FC<MapButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.mapButton} onClick={onClick}>
      <span className={styles.text}>Показати мапу</span>
      <Map size={20} className={styles.icon} />
    </button>
  );
};
export default MapButton;