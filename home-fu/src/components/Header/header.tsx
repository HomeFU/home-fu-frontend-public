import style from "./header.module.scss";
import RegisterButton from "./RegisterButton/registerbutton";
import TravetFilter from "./TravelFilter/travel-filter";
import MapButton from "./MapButton/mapbutton";
import SumButton from "../FiltersMenu/SumButton/sumbutton";
import FilterButton from "../FiltersMenu/FilterButton/filterbutton"

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.contentTop}>
                <div className={style.logo}><a>HomeFU</a></div>
                <ul className={style.listMenu}>
                    <li className={style.listItem}><a>Варіанти помешкань</a></li>
                    <li className={style.listItem}><a>Враження</a></li>
                    <li className={style.listItem}><a>Онлайн-враження</a></li>
                </ul>
                <div>
                    <RegisterButton></RegisterButton>
                </div>
            </div>
            <div className={style.contentBottom}>
                <TravetFilter></TravetFilter>
                <MapButton></MapButton>
            </div>
            <SumButton></SumButton>
            <FilterButton></FilterButton>
        </header>
    )
}

export default Header