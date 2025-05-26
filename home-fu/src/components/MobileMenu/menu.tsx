import { useDispatch, useSelector } from "react-redux";
import style from "./menu.module.scss";
import { Link } from "react-router-dom";
import { LogOutButton } from "../../features/Auth/LogOut/logOutButton";
import { LoginButton } from "../../features/Auth/LoginMobileButton/loginButton";
import { closeMenuPopUp } from "../../redux/MenuPopoUp/menuPopoUpSlice";

export const MobileMenu = () => {
    const isAuthenticatedUser = useSelector((state) => state.auth.isAuthenticated);
    const isOpenMobileMenu = useSelector((state) => state.mobileMenu.isOpen);

    const isUserAdmin = localStorage.getItem("isAdminUser");

    const dispatch = useDispatch();

    return(
        <div className={`${style.menu} ${isOpenMobileMenu ? style.openMenu : ''}`}>
            <div className={style.content}>
                <ul className={style.listMenu}>
                    <li className={style.listItem}><Link to="/">Варіанти помешкань</Link></li>
                    <li className={style.listItem}><Link to="/">Враження</Link></li>
                    <li className={style.listItem}><Link to="/">Онлайн-враження</Link></li>
                    <li className={style.listItem}><p>Повідомлення</p></li>
                    <li className={style.listItem}><p>Сповіщення</p></li>
                    <li className={style.listItem}><p>Подорожі</p></li>
                    <li className={style.listItem}><p>Обране</p></li>
                    <li className={style.listItem}><p>Організувати враження</p></li>
                    <li className={style.listItem}><p>Запросити господаря</p></li>
                    {
                        isUserAdmin === "Admin" &&  <li className={style.listItem}><Link to="/admin-panel" onClick={() => dispatch(closeMenuPopUp())}>Адмін панель</Link></li>
                    }
                    {
                        isAuthenticatedUser &&  <li className={style.listItem}><Link to="/profile" onClick={() => dispatch(closeMenuPopUp())}>Ваш профіль</Link></li>
                    }
                </ul>
                <div className={style.offerListWrapper}>
                    <Link className={style.offerItem} to="/">Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></Link>
                    {
                        isAuthenticatedUser ? <LogOutButton/> : <LoginButton/>
                    }
                </div>
            </div>
        </div>
    )
}