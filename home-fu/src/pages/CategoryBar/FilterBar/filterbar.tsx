import { useEffect, useRef, useState } from "react";
import style from "./filterbar.module.scss";
import  {setSelectedCategori} from "../../../redux/CategoryFilter/CategorySlice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../../../api/Categories/categories";
import { CategoriesModel } from "../../../types/Categories/categories";
import { useNavigate } from "react-router-dom";

export const FilterBar = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const selectedCategori = useSelector((state) => state.category.isSelectedCategori);

    const [dataCategories, setDataCategories] = useState<CategoriesModel[]>([]);
    const [isLoadingCategories, setLoadingCategories] = useState(true);

    console.log(dataCategories)
    const FetchDataCategories = async () => {
        try {
            const data = await Categories();
            setDataCategories(data);
        }
        catch {
            console.log("Error");
        }
        finally {
            setLoadingCategories(false);
        }
    }

    useEffect(() => {
        FetchDataCategories();
    }, []);

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
            {isVisibleLeftButton && !isLoadingCategories && (
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
                {
                    isLoadingCategories ? <div className={style.filterWrapperLoading}>
                        {Array.from({ length: 7 }, (_, index) => (
                            <div className={style.wrapperLoading} key={index}>
                                <div className={style.circle}></div>
                                <div className={style.bottomBlock}></div>
                            </div>
                        ))}
                    </div> : <>
                        {dataCategories.map((el) => (
                            <div key={el.id} className={`${style.filterItem} ${selectedCategori === el.id ? style.activeItem : ''}`}  onClick={() => {dispatch(setSelectedCategori(el.id)); navigate(`/?category=${el.id}`)}}>
                                <img className={style.filterItemimg} src={'https://homefuserverback.azurewebsites.net' + el.imageUrl} alt={el.name} />
                                <span>{el.name}</span>
                            </div>
                        ))}
                    </>
                }
            </div>
            {isVisibleRightButton && !isLoadingCategories && (
                <button className={`${style.scrollButton} ${style.rightButton}`} onClick={scrollRight}>
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
        </div>
    );
};

