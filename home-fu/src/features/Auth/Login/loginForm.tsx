import style from "./login.module.scss";
import close from "../../../assets/icons/closeIcon.svg";
import apple from "../../../assets/icons/appleIcon.svg";
import google from "../../../assets/icons/googleIcon.svg";
import facebook from "../../../assets/icons/facebookIconForm.svg";

const Login = () => {

    return (
        <div className={style.formCard}>
            <h2 className={style.title}>Login</h2>

            <button className={style.closeButton}>
                <img src={close} alt="close" />
            </button>

            <form className={style.formContent}>
                <input
                    type="email"
                    placeholder="Email"
                    className={style.input}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className={style.input}
                />

                <button className={style.loginButton}>Login</button>
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

export default Login;