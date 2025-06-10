
import { Link } from "react-router-dom";
import style from "./footerSite.module.scss";
import langIcon from "../../../assets/icons/languageIcon.svg";
import instaIcon from '../../../assets/icons/instagramIcon.svg';
import facebookIcon from '../../../assets/icons/facebookIcon.svg';

export const FooterSite = () => {
    return (
        <footer>
            <div className={style.wrapper}>
                <div className={style.supportWrapper}>
                    <div className={style.supportItem}>
                        <p className={style.supportTitle}>Підтримка</p>
                        <ul className={style.supportList}>
                            <li className={style.supportListItem}><Link to="/" >Довідковий центр</Link></li>
                            <li className={style.supportListItem}><Link to="/" >AirCover</Link></li>
                            <li className={style.supportListItem}><Link to="/" >Протидія дискримінації</Link></li>
                            <li className={style.supportListItem}><Link to="/" >Підтримка людей з інвалідністю</Link></li>
                            <li className={style.supportListItem}><Link to="/">Варіанти скасування бронювань</Link></li>
                            <li className={style.supportListItem}><Link to="/" >Надіслати скаргу від сусідів</Link></li>
                        </ul>
                    </div>
                    <div className={style.hostItem}>
                        <p className={style.hostTitle}>Прийом гостей</p>
                        <ul className={style.hostList}>
                            <li className={style.hostListItem}><Link to="/">Перетворити помешкання на HomeFU</Link></li>
                            <li className={style.hostListItem}><Link to="/">AirCover для господарів</Link></li>
                            <li className={style.hostListItem}><Link to="/">Ресурси про прийом гостей</Link></li>
                            <li className={style.hostListItem}><Link to="/">Форум спільноти</Link></li>
                            <li className={style.hostListItem}><Link to="/">Відповідальний прийом гостей</Link></li>
                        </ul>
                    </div>
                    <div className={style.homeFu}>
                        <p className={style.homeFuTitle}>HomeFU</p>
                        <ul className={style.homeFuList}>
                            <li className={style.homeFuListItem}><Link to="/">Новини</Link></li>
                            <li className={style.homeFuListItem}><Link to="/">Нові функції</Link></li>
                            <li className={style.homeFuListItem}><Link to="/">Вакансії</Link></li>
                            <li className={style.homeFuListItem}><Link to="/">Інвестори</Link></li>
                            <li className={style.homeFuListItem}><Link to="/">Тимчасове житло від HomeFU</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={style.footerBottomBlock}>
                    <div className={style.footerInfo}>
                        <span className={style.footerText}>2022 HomeFU, Inc.</span>
                        <ul className={style.footerLinks}>
                            <li className={style.footerLinksItem}><Link to="/">Конфінденційність</Link></li>
                            <li className={style.footerLinksItem}><Link to="/">Умови</Link></li>
                            <li className={style.footerLinksItem}><Link to="/">Мапа сайту</Link></li>
                        </ul>
                    </div>
                    <div className={style.footerActions}>
                        <button className={style.languageButton}>
                            <img src={langIcon} alt="languageIcon" loading="lazy"/>
                            Українська (UA)
                        </button>
                        <button className={style.currencyButton}>
                            $ USD
                        </button>
                        <ul className={style.socialLinks}>
                            <li className={style.socialLinkItem}><Link to="/"><img src={facebookIcon} alt="facebookIcon" loading="lazy"/></Link></li>
                            <li className={style.socialLinkItem}><Link to="/"><img src={instaIcon} alt="instagramIcon" loading="lazy"/></Link></li>
                        </ul>
                    </div>
                </div>  
            </div>
        </footer>
    )
}