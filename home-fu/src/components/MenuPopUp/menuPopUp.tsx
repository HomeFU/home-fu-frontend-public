
import { useSelector } from "react-redux";
import style from "./menuPopUp.module.scss";
import { Link } from "react-router-dom";

export const MenuPopoUp = () => {
    const openMenuPopoUp = useSelector((state) => state.menuPopUp.isOpen);

    return (
        <>
            {
                openMenuPopoUp && (
                    <div className={style.wrapperPopUp}>
                        <ul className={`${style.listLinks} ${style.listLinksFirstBlock}`}>
                            <li className={style.listLinksItem}><Link to="/">Повідомлення</Link></li>
                            <li className={style.listLinksItem}><Link to="/">Сповіщення</Link></li>
                            <li className={style.listLinksItem}><Link to="/">Подорожі</Link></li>
                            <li className={style.listLinksItem}><Link to="/">Обране</Link></li>
                        </ul>
                        <ul className={`${style.listLinks} ${style.listLinksSecondBlock}`}>
                            <li className={style.listLinksItem}><Link to="/">Запропонувати помешкання на Home<span className={style.logoModifier}>FU</span></Link></li>
                            <li className={style.listLinksItem}><Link to="/">Організувати враження</Link></li>
                            <li className={style.listLinksItem}><Link to="/">Запросити господаря</Link></li>
                            <li className={style.listLinksItem}><Link to="/profile">Ваш профіль</Link></li>
                        </ul>
                        <ul className={`${style.listLinks} ${style.listLinksThirdBlock}`}>
                            <li className={style.listLinksItem}><Link to="/">Довідковий центр</Link></li>
                            <li className={style.listLinksItem}><button className={style.buttonLogOut} type="button">Вийти</button></li>
                        </ul>
                    </div>
                )
            }
        </>
    )
}