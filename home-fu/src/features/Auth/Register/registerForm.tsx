import style from "./register.module.scss";
import close from "../../../assets/icons/closeIcon.svg";
import apple from "../../../assets/icons/appleIcon.svg";
import google from "../../../assets/icons/googleIcon.svg";
import facebook from "../../../assets/icons/facebookIconForm.svg";
import { useDispatch } from "react-redux";
import { closeRegisterForm } from "../../../redux/LoginRegisterFormSlice/formSlice";

const Register = () => {
    const dispatch = useDispatch();

    return (
        <div className={style.formCard}>
            <h2 className={style.title}>Register</h2>

            <button className={style.closeButton} onClick={() => dispatch(closeRegisterForm())}>
                <img src={close} alt="close" />
            </button>

            <form className={style.formContent}>
                <div className={style.formGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={style.input}
                    />
                    <p className={style.helperText}>We will send you an email to confirm your <br /> email address</p>
                </div>

                <input
                    type="password"
                    placeholder="Password"
                    className={style.input}
                />

                <input
                    type="password"
                    placeholder="Repeat password"
                    className={style.input}
                />

                <p className={style.policyText}>
                    *Get acquainted with our <span className={style.policyLink}>Privacy policy</span>
                </p>

                <button className={style.registerButton}>Register</button>
            </form>

            <div className={style.socialButtons}>
                <form>
                    <button className={style.socialButton}>
                        <img className={style.socialIcon} src={google} alt="googleIcon" />
                        <span>Sign In with Google</span>
                    </button>
                </form>

                <form>
                    <button className={style.socialButton}>
                        <img className={style.socialIcon} src={facebook} alt="facebookIcon" />
                        <span>Sign In with Facebook</span>
                    </button>
                </form>

                <form>
                    <button className={style.socialButton}>
                        <img className={style.socialIcon} src={apple} alt="appleIcon" />
                        <span>Sign In with Apple</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;