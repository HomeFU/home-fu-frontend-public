import { useEffect, useRef, useState } from "react";
import icon from "../../../assets/icons/house.svg";
import style from "./filterbar.module.scss";
import  {setSelectedCategori} from "../../../redux/CategoryFilter/CategorySlice/categorySlice";
import { useDispatch, useSelector } from "react-redux";

type CategoryItem = {
    id: number;
    icon: string;
    label: string;
};

const categories: CategoryItem[] = [
    { id: 1, icon: icon, label: "Гарні краєвиди" },
    { id: 2, icon: icon, label: "Невеликі квартири" },
    { id: 3, icon: icon, label: "Великі квартири" },
    { id: 4, icon: icon, label: "Кімнати" },
    { id: 5, icon: icon, label: "Хостели" },
    { id: 6, icon: icon, label: "Luxe" },
    { id: 7, icon: icon, label: "У центрі міста" },
    { id: 8, icon: icon, label: "Пляжний відпочинок" },
    { id: 9, icon: icon, label: "Гори" },
    { id: 10, icon: icon, label: "Сільська місцевість" },
    { id: 11, icon: icon, label: "Будиночки в лісі" },
    { id: 12, icon: icon, label: "Глемпінг" },
    { id: 13, icon: icon, label: "Будиночки на воді" },
    { id: 14, icon: icon, label: "Вілли" },
    { id: 15, icon: icon, label: "Апарт-готелі" },
    { id: 16, icon: icon, label: "Економ-житло" },
    { id: 17, icon: icon, label: "Будиночки на деревах" },
    { id: 18, icon: icon, label: "Історичні будівлі" },
];

const FilterBar = () => {
    const dispatch = useDispatch();
    const selectedCategori = useSelector((state) => state.category.isSelectedCategori);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isVisibleLeftButton, setVisibleLeftButton] = useState(false);
    const [isVisibleRightButton, setVisibleRightButton] = useState(true);

    const checkButtonVisibility = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const isScrolledToLeft = container.scrollLeft > 0;
            const isScrolledToRight = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

            setVisibleLeftButton(isScrolledToLeft);
            setVisibleRightButton(!isScrolledToRight);
        }
    };

    useEffect(() => {
        checkButtonVisibility();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className={style.filterBarWrapper}>
            {isVisibleLeftButton && (
                <button className={`${style.scrollButton} ${style.leftButton}`} onClick={scrollLeft}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 12L6 8L10 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
            <div
                className={style.filterBar}
                ref={scrollContainerRef}
                onScroll={checkButtonVisibility}
            >
                {categories.map((el) => (
                    <div key={el.id} className={`${style.filterItem} ${selectedCategori === el.label ? style.activeItem : ''}`} onClick={() => {dispatch(setSelectedCategori(el.label))}}>
                        <img src={el.icon} alt={el.label} />
                        <span>{el.label}</span>
                    </div>
                ))}
            </div>
            {isVisibleRightButton && (
                <button className={`${style.scrollButton} ${style.rightButton}`} onClick={scrollRight}>
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default FilterBar;
