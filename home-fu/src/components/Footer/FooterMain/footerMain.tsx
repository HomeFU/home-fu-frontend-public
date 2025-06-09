import { useEffect, useState } from "react";
import style from "./footerMain.module.scss"
import langIcon from "../../../assets/icons/languageIcon.svg"
import instaIcon from '../../../assets/icons/instagramIcon.svg';
import facebookIcon from '../../../assets/icons/facebookIcon.svg';
import { Link } from "react-router-dom";
import { Locations } from "../../../api/Locations/locations";
import { LocationModel } from "../../../types/Locations/locations";
import { GoogleMap } from "../../Header/GoogleMap/googleMap";

export const FooterMain = () => {
    const [activeTab, setActiveTab] = useState<string>("Популярні")
    const [location, setLocation] = useState<LocationModel[]>([]);

    const fetchLocationsData = async () => {
        const response = await Locations();
        setLocation(response);
    }

    const tabContentMap: Record<string, keyof typeof content> = {
        "Популярні": "popular",
        "Мистецтво й культура": "culture",
        "Відпочинок на відкритому повітрі": "outdoor",
        "Гори": "mountains",
        "Пляж": "beach",
        "Категорії": "categories",
        "Чим зайнятися": "activities"
    };

    useEffect(() => {
        fetchLocationsData();
    },[])

    const content = {
        popular: [
          { title: "Канмор", subtitle: "Оренда квартир" },
          { title: "Бенальмадена", subtitle: "Оренда будинків" },
          { title: "Марбелья", subtitle: "Оренда будинків" },
          { title: "Міхас", subtitle: "Оренда квартир" },
          { title: "Прескотт", subtitle: "Оренда зрубів" },
          { title: "Скоттсдейл", subtitle: "Оренда помешкань із басейном" },
          { title: "Тусон", subtitle: "Оренда кондомініумів" },
          { title: "Джаспер", subtitle: "Помешкання для відпочинку" },
          { title: "Маунтін-В'ю", subtitle: "Оренда будинків" },
          { title: "Девонпорт", subtitle: "Помешкання для відпочинку" },
          { title: "Маллакота", subtitle: "Помешкання для відпочинку" },
          { title: "Івіса", subtitle: "Помешкання для відпочинку" },
          { title: "Анахайм", subtitle: "Оренда помешкань для відпочинку" },
          { title: "Пасо Роблес", subtitle: "Помешкання для відпочинку" },
          { title: "Санта-Барбара", subtitle: "Оренда заміських домівок" },
          { title: "Сан-Дієго", subtitle: "Оренда квартир біля океану" },
          { title: "Санта-Крус", subtitle: "Оренда будинків на узбережжі" },
          { title: "Монтерей", subtitle: "Помешкання з видом на море" }
        ],
        culture: [
          { title: "Флоренція", subtitle: "Помешкання поруч із музеями" },
          { title: "Париж", subtitle: "Оренда квартир поруч з культурними пам’ятками" },
          { title: "Кіото", subtitle: "Оренда будинків у історичних районах" },
          { title: "Севілья", subtitle: "Житло поруч з архітектурними шедеврами" },
          { title: "Афіни", subtitle: "Оренда з краєвидом на руїни" },
          { title: "Львів", subtitle: "Квартири в історичному центрі" },
          { title: "Прага", subtitle: "Оренда в старому місті" },
          { title: "Будапешт", subtitle: "Помешкання біля термальних купалень" },
          { title: "Відень", subtitle: "Житло поруч з оперою" },
          { title: "Барселона", subtitle: "Апартаменти біля Гауді" },
          { title: "Рим", subtitle: "Оренда поруч з Колізеєм" },
          { title: "Краків", subtitle: "Квартири в старому місті" },
          { title: "Амстердам", subtitle: "Житло на каналах" },
          { title: "Берлін", subtitle: "Помешкання біля музеїв" },
          { title: "Лондон", subtitle: "Оренда в центрі міста" },
          { title: "Стамбул", subtitle: "Квартири з видом на Босфор" },
          { title: "Київ", subtitle: "Житло поруч з історичними пам’ятками" },
          { title: "Чернівці", subtitle: "Оренда в центрі міста" }
        ],
        outdoor: [
          { title: "Юта", subtitle: "Кемпінг у національних парках" },
          { title: "Альберта", subtitle: "Заміські котеджі" },
          { title: "Патагонія", subtitle: "Оренда будиночків у дикій природі" },
          { title: "Нова Зеландія", subtitle: "Пригодницький відпочинок" },
          { title: "Норвегія", subtitle: "Фьорди та походи" },
          { title: "Банф", subtitle: "Житло біля гірських озер" },
          { title: "Шацькі озера", subtitle: "Кемпінг біля озер" },
          { title: "Актовський каньйон", subtitle: "Палатки серед скель" },
          { title: "Кінбурнська коса", subtitle: "Відпочинок на узбережжі" },
          { title: "Мигія", subtitle: "Рафтинг та кемпінг" },
          { title: "Джарилгач", subtitle: "Острівний відпочинок" },
          { title: "Карпати", subtitle: "Піші походи та кемпінг" },
          { title: "Синевир", subtitle: "Житло біля озера" },
          { title: "Яремче", subtitle: "Тури на квадроциклах" },
          { title: "Сходниця", subtitle: "Бальнеологічний курорт" },
          { title: "Узана", subtitle: "Гірський відпочинок" },
          { title: "Буковель", subtitle: "Літні активності" },
          { title: "Татри", subtitle: "Гірські походи" }
        ],
        mountains: [
          { title: "Альпи", subtitle: "Шале в горах" },
          { title: "Рокі-Маунтінс", subtitle: "Гірські котеджі" },
          { title: "Карпати", subtitle: "Заміські будинки" },
          { title: "Андські гори", subtitle: "Гірські притулки" },
          { title: "Татри", subtitle: "Оренда в горах" },
          { title: "Доломіти", subtitle: "Житло з краєвидом" },
          { title: "Сходниця", subtitle: "Бальнеологічний курорт" },
          { title: "Яремче", subtitle: "Гірський відпочинок" },
          { title: "Буковель", subtitle: "Гірськолижний курорт" },
          { title: "Узана", subtitle: "Гірський курорт" },
          { title: "Сонячна долина", subtitle: "Гірськолижний комплекс" },
          { title: "Герлаховський Штит", subtitle: "Найвища вершина Татр" },
          { title: "Ломницький Штит", subtitle: "Гірські походи" },
          { title: "Кривань", subtitle: "Гірський туризм" },
          { title: "Попрадське Плесо", subtitle: "Озеро в горах" },
          { title: "Штрбське Плесо", subtitle: "Гірське озеро" },
          { title: "Високі Татри", subtitle: "Гірський масив" },
          { title: "Мармароси", subtitle: "Гірський хребет" }
        ],
        beach: [
          { title: "Мальдіви", subtitle: "Вілли на пляжі" },
          { title: "Балі", subtitle: "Помешкання біля океану" },
          { title: "Гаваї", subtitle: "Бунгало на пляжі" },
          { title: "Барселона", subtitle: "Апартаменти поруч з морем" },
          { title: "Сицилія", subtitle: "Оренда біля узбережжя" },
          { title: "Маямі", subtitle: "Кондомініуми з видом на пляж" },
          { title: "Одеса", subtitle: "Квартири біля моря" },
          { title: "Затока", subtitle: "Помешкання на узбережжі" },
          { title: "Коблево", subtitle: "Оренда біля пляжу" },
          { title: "Скадовськ", subtitle: "Житло біля моря" },
          { title: "Лазурне", subtitle: "Котеджі на узбережжі" },
          { title: "Бердянськ", subtitle: "Апартаменти біля пляжу" },
          { title: "Кирилівка", subtitle: "Оренда на узбережжі" },
          { title: "Приморськ", subtitle: "Житло біля моря" },
          { title: "Генічеськ", subtitle: "Квартири на узбережжі" },
          { title: "Южне", subtitle: "Помешкання біля пляжу" },
          { title: "Чорноморськ", subtitle: "Оренда біля моря" },
          { title: "Іллічівськ", subtitle: "Житло на узбережжі" }
        ],
        categories: [
          { title: "Заміські будинки", subtitle: "Відпочинок на природі" },
          { title: "Помешкання з басейном", subtitle: "Ідеально для літа" },
          { title: "Містечкові апартаменти", subtitle: "Затишок та зручність" },
          { title: "Еко-житло", subtitle: "Сталий відпочинок" },
          { title: "Розкішні вілли", subtitle: "Елітний комфорт" },
          { title: "Мобільні будинки", subtitle: "Свобода пересування" },
          { title: "Карпати", subtitle: "Заміські будинки" },
          { title: "Андські гори", subtitle: "Гірські притулки" },
          { title: "Татри", subtitle: "Оренда в горах" },
          { title: "Доломіти", subtitle: "Житло з краєвидом" },
          { title: "Сходниця", subtitle: "Бальнеологічний курорт" },
        ],
        activities: [
            { title: "Містечкові апартаменти", subtitle: "Затишок та зручність" },
            { title: "Еко-житло", subtitle: "Сталий відпочинок" },
            { title: "Розкішні вілли", subtitle: "Елітний комфорт" },
            { title: "Мобільні будинки", subtitle: "Свобода пересування" },
            { title: "Коблево", subtitle: "Оренда біля пляжу" },
            { title: "Скадовськ", subtitle: "Житло біля моря" },
            { title: "Лазурне", subtitle: "Котеджі на узбережжі" },
            { title: "Бердянськ", subtitle: "Апартаменти біля пляжу" },
            { title: "Кирилівка", subtitle: "Оренда на узбережжі" },
            { title: "Бенальмадена", subtitle: "Оренда будинків" },
            { title: "Марбелья", subtitle: "Оренда будинків" },
            { title: "Міхас", subtitle: "Оренда квартир" },
            { title: "Прескотт", subtitle: "Оренда зрубів" },
            { title: "Скоттсдейл", subtitle: "Оренда помешкань із басейном" },
            { title: "Тусон", subtitle: "Оренда кондомініумів" },
        ]
    }
       
    return (
        <>
        <footer className={style.footer}>
            <GoogleMap/>
            <div className={style.wrapper}>
                <h2 className={style.footerTitle}>Ідеї для майбутніх поїздок</h2>
                <div className={style.wrapperButtons}>
                    {
                        location.map((tab) => (
                            <button onClick={() => setActiveTab(tab.name)} className={`${style.tabButton} ${activeTab === tab.name ? style.active : ''}`} key={tab.id}>{tab.name}</button>
                        ))
                    }
                </div>
                <div className={style.tabContent}>
                    {content[tabContentMap[activeTab]]?.map((item, index) => (
                        <Link to="/" key={index} className={style.tabItem}>
                            <p className={style.tabItemTitle}>{item.title}</p>
                            <span className={style.tabItemSubtitle}>{item.subtitle}</span>
                        </Link>
                    ))}
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
                            <li className={style.socialLinkItem}><Link to="/"><img src={facebookIcon} alt="facebookIcon" loading="lazy" /></Link></li>
                            <li className={style.socialLinkItem}><Link to="/"><img src={instaIcon} alt="instagramIcon" loading="lazy"/></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}
