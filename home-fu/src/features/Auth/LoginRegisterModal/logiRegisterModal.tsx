import { useDispatch, useSelector } from "react-redux";
import { closeLoginForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
import {Login} from "../Login/loginForm";
import {Register} from "../Register/registerForm";
import style from "./loginRegister.module.scss";

export const LoginRegister = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.form.isOpen);
    const isRegisterForm = useSelector((state) => state.form.isOpenRegisterForm);

    return(
        <div className={`${style.overlay} ${isOpen ? style.open : ''}`} onClick={() => dispatch(closeLoginForm())}>
            <div onClick={(e) => e.stopPropagation()}>
                {
                    isRegisterForm ? <Register/> : <Login/>
                }
            </div>
        </div>
    )
}
