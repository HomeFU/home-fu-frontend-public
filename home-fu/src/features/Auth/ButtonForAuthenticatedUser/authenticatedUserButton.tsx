import styles from  "./authenticatedUserButton.module.scss";
import menuIcon from "../../../../src/assets/icons/iconMenu.svg";
import { toggleMenuPopUp } from "../../../redux/MenuPopoUp/menuPopoUpSlice";
import { useDispatch } from "react-redux";

export const AuthenticatedUserButton = () => {
    const dispatch = useDispatch();
    
    return (
        <button className={styles.registerbutton} onClick={() => {dispatch(toggleMenuPopUp())}}>
            <img src={menuIcon} className={styles.icon} loading="lazy"/>
            <p>Фото Юзера</p>
        </button>
    );
  };