import styles from  "./authenticatedUserButton.module.scss";
import menuIcon from "../../../../src/assets/icons/iconMenu.svg";
import { toggleMenuPopUp } from "../../../redux/MenuPopoUp/menuPopoUpSlice";
import { useDispatch } from "react-redux";
import { useFullInfoUser } from "../../../hooks/useFullUserInfo";
import NoUserPhoto from "../../../assets/images/noPhotoUser.jpg";
import { useEffect } from "react";

type UserData = {
    id:string;
    profileImageUrl: string;
};

export const AuthenticatedUserButton = () => {
    const dispatch = useDispatch();

    const token = localStorage.getItem('token') as string;

    const {
        data: fullInfoUserData = {} as UserData,
    } = useFullInfoUser(token);
    
    useEffect(() => {
        if (fullInfoUserData?.id) {
        localStorage.setItem("userId", String(fullInfoUserData.id));
        }
    }, [fullInfoUserData?.id]);

    return (
        <button className={styles.authenticatedUserButton} onClick={() => {dispatch(toggleMenuPopUp())}}>
            <img src={menuIcon} className={styles.icon} />
            {
                fullInfoUserData.profileImageUrl !== null
                ?  <img className={styles.userImage} loading="lazy" src={`https://homefu.azurewebsites.net${fullInfoUserData.profileImageUrl}`} alt="userPhoto" /> 
                : <img className={styles.userImage} loading="lazy" src={NoUserPhoto} alt="userPhoto" />
            }
        </button>
    );
  };