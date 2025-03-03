import styles from "./mapbutton.module.scss";
import mapIcon from "../../../assets/icons/iconMap.svg";

type MapButtonProps = {
  onClick?: () => void; 
};

const MapButton = ({ onClick }: MapButtonProps) => {
  return (
    <button className={styles.mapButton} onClick={onClick}>
      <span className={styles.text}>Показати мапу</span>
      <img src={mapIcon} className={styles.icon} />
    </button>
  );
};

export default MapButton;
