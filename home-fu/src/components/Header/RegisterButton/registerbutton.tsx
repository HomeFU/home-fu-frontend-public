import styles from "./registerbutton.module.scss";
import menuIcon from "../../../assets/icons/iconMenu.svg";
import userIcon from "../../../assets/icons/iconUser.svg";
import { useDispatch } from "react-redux";
import { toggleForm } from "../../../redux/LoginRegisterFormSlice/formSlice";
// import Login from "../../../features/Auth/Login/loginForm";
import LoginRegister from "../../../features/Auth/LoginRegisterModal/logiRegisterModal";

const RegisterButton = () => {
  const dispatch = useDispatch();
  
  return (
    <>
      <button className={styles.registerbutton} onClick={() => dispatch(toggleForm())}>
        <img src={menuIcon} className={styles.icon} />
        <img src={userIcon} className={styles.icon} />
      </button>
      <LoginRegister/>
      {/* <Login/> */}
    </>
  );
};

export default RegisterButton;
