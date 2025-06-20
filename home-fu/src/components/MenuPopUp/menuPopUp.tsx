import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import style from "./menuPopUp.module.scss";
import { LogOutButton } from "../../features/Auth/LogOut/logOutButton";
import { Link } from "react-router-dom";
import { closeMenuPopUp } from "..//..//redux/MenuPopoUp/menuPopoUpSlice"
import type { RootState } from "..//..//redux/store";

export const MenuPopoUp = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.menuPopUp.isOpen);

    const isUserAdmin = localStorage.getItem("isAdminUser");

    return (
        <>
            {
                isOpen && (
                    <div className={style.wrapperPopUp}>
                        <ul className={`${style.listLinks} ${style.listLinksFirstBlock}`}>
                            <li className={style.listLinksItem}><p>Повідомлення</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Сповіщення</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Подорожі</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Обране</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                        </ul>
                        <ul className={`${style.listLinks} ${style.listLinksSecondBlock}`}>
                            <Link to='/owner' className={style.listLinksItem}><p>Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></p></Link>
                            <li className={style.listLinksItem}><p>Організувати враження</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Запросити господаря</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            {
                                isUserAdmin === "Admin" &&  <li className={style.listLinksItem}><Link to="/admin-panel" onClick={() => dispatch(closeMenuPopUp())}>Адмін панель</Link></li>
                            }
                            <li className={style.listLinksItem}><Link to="/profile" onClick={() => dispatch(closeMenuPopUp())}>Ваш профіль</Link></li>
                            <li className={style.listLinksItem}><Link to="/owner" onClick={() => dispatch(closeMenuPopUp())}>Стати господарем</Link></li>
                        </ul>
                        <ul className={`${style.listLinks} ${style.listLinksThirdBlock}`}>
                            <li className={style.listLinksItem}><p>Довідковий центр</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><LogOutButton/></li>
                        </ul>
                    </div>
                )
            }
        </>
    )
}