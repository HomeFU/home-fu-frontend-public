import style from "./logOutButton.module.scss";
import { logout } from "../../../redux/Auth/authSlice";
import { useDispatch } from "react-redux";
import { toggleMenuPopUp } from "../../../redux/MenuPopoUp/menuPopoUpSlice";

export const LogOutButton = () => {

    const dispatch = useDispatch();
    
    const handleLogOut = () => {
        dispatch(logout());
        dispatch(toggleMenuPopUp());
    }

    return(
        <button className={style.logOut} onClick={handleLogOut}>Вийти</button>
    )
}

