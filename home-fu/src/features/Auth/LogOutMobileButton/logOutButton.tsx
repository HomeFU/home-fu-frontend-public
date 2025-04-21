import { useDispatch } from "react-redux";
import style from "./logOut.module.scss";
import { logout } from "../../../redux/Auth/authSlice";

export const LogOutButton = () => {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout());
    }

    return (
        <button onClick={handleLogOut} className={style.logOut}>Log Out</button>
    )
}