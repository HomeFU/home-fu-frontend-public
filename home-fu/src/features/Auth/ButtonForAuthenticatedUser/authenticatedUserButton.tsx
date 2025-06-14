import styles from  "./authenticatedUserButton.module.scss";
import menuIcon from "../../../../src/assets/icons/iconMenu.svg";
import { toggleMenuPopUp } from "../../../redux/MenuPopoUp/menuPopoUpSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFullInfoUser } from "../../../hooks/useFullUserInfo";
import NoUserPhoto from "../../../assets/images/noPhotoUser.jpg";
import { RootState } from "../../../redux/store";

type UserValidate = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    birthDate: string;
    gender: string;
    profileImageUrl: string;
};

export const AuthenticatedUserButton = () => {
    const dispatch = useDispatch();

    const token = localStorage.getItem('token') as string;

    const user = useSelector((state: RootState) => state.auth.user);

    const {
        data: fullInfoUserData = {} as UserValidate,
    } = useFullInfoUser(token);

    const customPhoto = fullInfoUserData?.profileImageUrl;
    const googlePhoto = user?.photoURL;

    const avatar = customPhoto
        ? `https://homefu.azurewebsites.net${customPhoto}`
        : googlePhoto
            ? googlePhoto
            : NoUserPhoto;

    return (
        <button
            className={styles.authenticatedUserButton}
            onClick={() => {
                dispatch(toggleMenuPopUp());
            }}
        >
            <img src={menuIcon} className={styles.icon} />
            <img
                className={styles.userImage}
                loading="lazy"
                src={avatar}
                alt="userPhoto"
            />
        </button>
    );
};


// export const AuthenticatedUserButton = () => {
//     const dispatch = useDispatch();

//     const token = localStorage.getItem('token') as string;

//     const {
//         data: fullInfoUserData = {} as UserValidate,
//     } = useFullInfoUser(token);
    

//     return (
//         <button className={styles.authenticatedUserButton} onClick={() => {dispatch(toggleMenuPopUp())}}>
//             <img src={menuIcon} className={styles.icon} />
//             {
//                 fullInfoUserData.profileImageUrl !== null
//                 ?  <img className={styles.userImage} loading="lazy" src={`https://homefu.azurewebsites.net${fullInfoUserData.profileImageUrl}`} alt="userPhoto" /> 
//                 : <img className={styles.userImage} loading="lazy" src={NoUserPhoto} alt="userPhoto" />
//             }
//         </button>
//     );
// };