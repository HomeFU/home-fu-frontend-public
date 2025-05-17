import { useSelector } from "react-redux";
import style from "./menu.module.scss";
import { Link } from "react-router-dom";
import { LogOutButton } from "../../features/Auth/LogOut/logOutButton";
import { LoginButton } from "../../features/Auth/LoginMobileButton/loginButton";

export const MobileMenu = () => {
    const isAuthenticatedUser = useSelector((state) => state.auth.isAuthenticated);
    const isOpenMobileMenu = useSelector((state) => state.mobileMenu.isOpen);

    return(
        <div className={`${style.menu} ${isOpenMobileMenu ? style.openMenu : ''}`}>
            <div className={style.content}>
                <ul className={style.listMenu}>
                    <li className={style.listItem}><Link to="/">Варіанти помешкань</Link></li>
                    <li className={style.listItem}><Link to="/">Враження</Link></li>
                    <li className={style.listItem}><Link to="/">Онлайн-враження</Link></li>
                    <li className={style.listItem}><Link to="/">Повідомлення</Link></li>
                    <li className={style.listItem}><Link to="/">Сповіщення</Link></li>
                    <li className={style.listItem}><Link to="/">Подорожі</Link></li>
                    <li className={style.listItem}><Link to="/">Обране</Link></li>
                    <li className={style.listItem}><Link to="/">Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></Link></li>
                    <li className={style.listItem}><Link to="/">Організувати враження</Link></li>
                    <li className={style.listItem}><Link to="/">Запросити господаря</Link></li>
                    <li className={style.listItem}><Link to="/profile">Ваш профіль</Link></li>
                    <li className={style.listItem}><Link to="/">Довідковий центр</Link></li>
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