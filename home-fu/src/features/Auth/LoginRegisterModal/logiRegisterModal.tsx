import { useDispatch, useSelector } from "react-redux";
import { closeLoginForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
import {Login} from "../Login/loginForm";
import {Register} from "../Register/registerForm";
import style from "./loginRegister.module.scss";
import type { RootState } from "..//..//..//redux/store";

export const LoginRegister = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.form.isOpen);
    const isRegisterForm = useSelector((state: RootState) => state.form.isOpenRegisterForm);

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
