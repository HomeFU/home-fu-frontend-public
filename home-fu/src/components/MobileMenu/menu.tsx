import { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./menu.module.scss";
import { Link } from "react-router-dom";
import { LogOutButton } from "../../features/Auth/LogOut/logOutButton";
import { LoginButton } from "../../features/Auth/LoginMobileButton/loginButton";

export const MobileMenu = () => {
    const isAuthenticatedUser = useSelector((state) => state.auth.isAuthenticated);
    const isOpenMobileMenu = useSelector((state) => state.mobileMenu.isOpen);

        useEffect(() => {
        if (isOpenMobileMenu) {
            document.body.classList.add("lock-scroll");
        } else {
            document.body.classList.remove("lock-scroll");
        }
    }, [isOpenMobileMenu]);

    return(
        <div className={`${style.menu} ${isOpenMobileMenu ? style.openMenu : ''}`}>
            <div className={style.content}>
                <ul className={style.listMenu}>
                    <li className={style.listItem}><p>Варіанти помешкань</p></li>
                    <li className={style.listItem}><p>Враження</p></li>
                    <li className={style.listItem}><p>Онлайн-враження</p></li>
                    <li className={style.listItem}><p>Повідомлення</p></li>
                    <li className={style.listItem}><p>Сповіщення</p></li>
                    <li className={style.listItem}><p>Подорожі</p></li>
                    <li className={style.listItem}><p>Обране</p></li>
                    <li className={style.listItem}><p>Організувати враження</p></li>
                    <li className={style.listItem}><p>Запросити господаря</p></li>
                    <li className={style.listItem}><Link to="/profile">Ваш профіль</Link></li>
                    <li className={style.listItem}><p>Довідковий центр</p></li>
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