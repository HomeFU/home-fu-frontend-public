
import { useSelector } from "react-redux";
import style from "./menuPopUp.module.scss";
import { LogOutButton } from "../../features/Auth/LogOut/logOutButton";
import { Link } from "react-router-dom";

export const MenuPopoUp = () => {
    const openMenuPopoUp = useSelector((state) => state.menuPopUp.isOpen);

    return (
        <>
            {
                openMenuPopoUp && (
                    <div className={style.wrapperPopUp}>
                        <ul className={`${style.listLinks} ${style.listLinksFirstBlock}`}>
                            <li className={style.listLinksItem}><p>Повідомлення</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Сповіщення</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Подорожі</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Обране</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                        </ul>
                        <ul className={`${style.listLinks} ${style.listLinksSecondBlock}`}>
                            <li className={style.listLinksItem}><p>Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Організувати враження</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><p>Запросити господаря</p><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><Link to="/profile">Ваш профіль</Link></li>
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