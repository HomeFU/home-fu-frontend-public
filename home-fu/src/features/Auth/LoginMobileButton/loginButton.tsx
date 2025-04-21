
import { useDispatch } from "react-redux";
import style from "./loginButton.module.scss";
import { toggleForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
import { LoginRegister } from "../LoginRegisterModal/logiRegisterModal";

export const LoginButton = () => {
    const dispatch = useDispatch();

    const onTogleLoginForm = () => {
        dispatch(toggleForm());
    }

    return (
        <>
         <button onClick={onTogleLoginForm} className={style.logIn}>LogIn</button>
         <LoginRegister/>
        </>
    )
}