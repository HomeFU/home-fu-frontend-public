import style from "./logOutButton.module.scss";
import { logout } from "../../../redux/Auth/authSlice";
import { useDispatch } from "react-redux";
import { toggleMenuPopUp } from "../../../redux/MenuPopoUp/menuPopoUpSlice";
import { useNavigate } from "react-router-dom"; 
import { signOut } from "firebase/auth";
import { auth } from "../../../App";

export const LogOutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogOut = async () => {
        dispatch(logout());
        await signOut(auth);
        dispatch(toggleMenuPopUp());
        navigate("/"); 
    };

    return (
        <button className={style.logOut} onClick={handleLogOut}>Вийти</button>
    );
};
