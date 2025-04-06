import logOut from "../../../assets/icons/logOutIcon.svg";
import style from "./logOutButton.module.scss";
import { logout } from "../../../redux/Auth/authSlice";
import { useDispatch } from "react-redux";

export const LogOutButton = () => {
    
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout());
    }

    return(
        <button className={style.logOut} onClick={handleLogOut}>
            <img src={logOut} alt="logOutIcon" />
            Log Out
        </button>
    )
}

