import { useState } from "react";
import style from './footer.module.scss';
import langIcon from '../../assets/icons/languageIcon.svg';
import instaIcon from '../../assets/icons/instagramIcon.svg';
import facebookIcon from '../../assets/icons/facebookIcon.svg';

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
                        <a className={style.tabItem} key={index}>
                            <p className={style.tabItemTitle}>{item.title}</p>
                            <span className={style.tabItemSubtitle}>{item.subtitle}</span>
                        </a>
                    ))
                }
            </div>
            <div className={style.supportWrapper}>
                <div className={style.supportItem}>
                    <p className={style.supportTitle}>Підтримка</p>
                    <ul className={style.supportList}>
                        <li className={style.supportListItem}><a href="">Довідковий центр</a></li>
                        <li className={style.supportListItem}><a href="">AirCover</a></li>
                        <li className={style.supportListItem}><a href="">Протидія дискримінації</a></li>
                        <li className={style.supportListItem}><a href="">Підтримка людей з інвалідністю</a></li>
                        <li className={style.supportListItem}><a href="">Варіанти скасування бронювань</a></li>
                        <li className={style.supportListItem}><a href="">Надіслати скаргу від сусідів</a></li>
                    </ul>
                </div>
                <div className={style.hostItem}>
                    <p className={style.hostTitle}>Прийом гостей</p>
                    <ul className={style.hostList}>
                        <li className={style.hostListItem}><a href="">Перетворити помешкання на HomeFU</a></li>
                        <li className={style.hostListItem}><a href="">AirCover для господарів</a></li>
                        <li className={style.hostListItem}><a href="">Ресурси про прийом гостей</a></li>
                        <li className={style.hostListItem}><a href="">Форум спільноти</a></li>
                        <li className={style.hostListItem}><a href="">Відповідальний прийом гостей</a></li>
                    </ul>
                </div>
                <div className={style.homeFu}>
                    <p className={style.homeFuTitle}>HomeFU</p>
                    <ul className={style.homeFuList}>
                        <li className={style.homeFuListItem}><a href="">Новини</a></li>
                        <li className={style.homeFuListItem}><a href="">Нові функції</a></li>
                        <li className={style.homeFuListItem}><a href="">Вакансії</a></li>
                        <li className={style.homeFuListItem}><a href="">Інвестори</a></li>
                        <li className={style.homeFuListItem}><a href="">Тимчасове житло від HomeFU</a></li>
                    </ul>
                </div>
            </div>
            <div className={style.footerBottomBlock}>
                <div className={style.footerInfo}>
                    <span className={style.footerText}>2022 HomeFU, Inc.</span>
                    <ul className={style.footerLinks}>
                        <li className={style.footerLinksItem}><a href="">Конфінденційність</a></li>
                        <li className={style.footerLinksItem}><a href="">Умови</a></li>
                        <li className={style.footerLinksItem}><a href="">Мапа сайту</a></li>
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
                        <li className={style.socialLinkItem}><a href=""><img src={facebookIcon} alt="facebookIcon" /></a></li>
                        <li className={style.socialLinkItem}><a href=""><img src={instaIcon} alt="instagramIcon"/></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </>)
}

export default Footer;