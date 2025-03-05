import { useState } from "react";
import style from './footer.module.scss';
import langIcon from '../../assets/icons/languageIcon.svg';
import instaIcon from '../../assets/icons/instagramIcon.svg';
import facebookIcon from '../../assets/icons/facebookIcon.svg';
import { Link } from "react-router-dom";

type Tab = {
    id:string;
    label:string;
}

type Location = {
    title:string;
    subtitle:string;
}

type ActiveTab = {
    [key: string]: Location[];
}

const Footer = () => {
    const [activeTab, setActiveTab] = useState<string>('popular');

    const tabs:Tab[] = [
        { id: "popular", label: "Популярні" },
        { id: "culture", label: "Мистецтво й культура" },
        { id: "outdoor", label: "Відпочинок на відкритому повітрі" },
        { id: "mountains", label: "Гори" },
        { id: "beach", label: "Пляж" },
        { id: "categories", label: "Категорії" },
        { id: "activities", label: "Чим зайнятися" },
    ];

    const content:ActiveTab = {
        popular: [
            { title: "Canmore", subtitle: "Оренда квартир" },
            { title: "Benalmadena", subtitle: "Оренда будинків" },
            { title: "Марбелья", subtitle: "Оренда будинків" },
            { title: "Mixas", subtitle: "Оренда квартир" },
            { title: "Prescott", subtitle: "Оренда зрубів" },
            { title: "Скоттсдейл", subtitle: "Оренда помешкань із басейном" },
            { title: "Тусон", subtitle: "Оренда кондомініумів" },
            { title: "Jasper", subtitle: "Помешкання для відпочинку" },
            { title: "Маунтін-Б’ю", subtitle: "Оренда будинків" },
            { title: "Devonport", subtitle: "Помешкання для відпочинку" },
            { title: "Mallacoota", subtitle: "Помешкання для відпочинку" },
            { title: "Eivissa", subtitle: "Помешкання для відпочинку" },
            { title: "Анахайм", subtitle: "Оренда помешкань для відпочинку" },
            { title: "Paso Robles", subtitle: "Помешкання для відпочинку" },
            { title: "Санта-Барбара", subtitle: "Оренда заміських домівок" },
            { title: "Paso Robles", subtitle: "Помешкання для відпочинку" },
        ],
        culture: [
           
        ],
        outdoor: [

        ],
        mountains: [

        ],
        beach: [

        ],
        categories: [

        ],
        activities: [
            
        ]
    }

    return (<>
        <footer className={style.footer}>
            <h2 className={style.footerTitle}>Ідеї для майбутніх поїздок</h2>
            <div className={style.wrapperButtons}>
                {
                    tabs.map((tab) => (
                        <button onClick={() => setActiveTab(tab.id)} className={`${style.tabButton} ${activeTab === tab.id ? style.active : ''}`} key={tab.id}>{tab.label}</button>
                    ))
                }
            </div>
            <div className={style.tabContent}>
                {
                    content[activeTab].map((item, index) => (
                        <Link to="/" className={style.tabItem} key={index}>
                            <p className={style.tabItemTitle}>{item.title}</p>
                            <span className={style.tabItemSubtitle}>{item.subtitle}</span>
                        </Link>
                    ))
                }
            </div>
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
                        <img src={langIcon} alt="languageIcon" />
                        Українська (UA)
                    </button>
                    <button className={style.currencyButton}>
                        $ USD
                    </button>
                    <ul className={style.socialLinks}>
                        <li className={style.socialLinkItem}><Link to="/"><img src={facebookIcon} alt="facebookIcon" /></Link></li>
                        <li className={style.socialLinkItem}><Link to="/"><img src={instaIcon} alt="instagramIcon"/></Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    </>)
}

export default Footer;