
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
                            <li className={style.listLinksItem}><Link to="/">Повідомлення</Link><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><Link to="/">Сповіщення</Link><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><Link to="/">Подорожі</Link><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><Link to="/">Обране</Link><div className={style.comingSoonPopup}>Coming soon</div></li>
                        </ul>
                        <ul className={`${style.listLinks} ${style.listLinksSecondBlock}`}>
                            <li className={style.listLinksItem}><Link to="/">Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></Link><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><Link to="/">Організувати враження</Link><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><Link to="/">Запросити господаря</Link><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><Link to="/profile">Ваш профіль</Link></li>
                        </ul>
                        <ul className={`${style.listLinks} ${style.listLinksThirdBlock}`}>
                            <li className={style.listLinksItem}><Link to="/">Довідковий центр</Link><div className={style.comingSoonPopup}>Coming soon</div></li>
                            <li className={style.listLinksItem}><LogOutButton/></li>
                        </ul>
                    </div>
                )
            }
        </>
    )
}