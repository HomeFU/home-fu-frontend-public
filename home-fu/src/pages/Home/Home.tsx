import { Header } from "../../components/Header/HeaderMain/header";
import { FooterMain } from "../../components/Footer/FooterMain/footerMain";
import { CardsCategoriesModel } from "../../types/Categories/cardsCategories";
import { CardsCategories } from "../../api/Categories/cardsCategories";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { setSelectedCategori } from "../../redux/CategoryFilter/CategorySlice/categorySlice";
// import { categorySlice } from "../../redux/CategoryFilter/CategorySlice/categorySlice";
import { useSearchParams } from "react-router-dom";
import style from "./home.module.scss";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const categoryIdFromUrl = parseInt(searchParams.get("category") || "1");

    const [dataCardsCategories, setdataCardsCategories] = useState<CardsCategoriesModel[]>([]);
    const [isLoadingCardsCategories , setLoadingCardsCategories] = useState(true);

    // const selectedCategori = useSelector((state) => state.category.isSelectedCategori);

    const FetchDataCardsCategories = async () => {
        try {
            const data = await CardsCategories(categoryIdFromUrl);
            setdataCardsCategories(data);
        } catch {
            console.log("Error")
        } finally {
            setLoadingCardsCategories(false);
        }
    }

    useEffect(() => {
        FetchDataCardsCategories()
    },[categoryIdFromUrl])

    useEffect(() => {
        dispatch(setSelectedCategori(categoryIdFromUrl));
    },[categoryIdFromUrl])
    console.log(dataCardsCategories);

    return (<>
        <Header/>
        <main className={style.main}>
            <div className={style.container}>
                {
                    !isLoadingCardsCategories ? <div className={style.cardItemWrapperLoading}>
                        {Array.from({ length: 16 }, (_, index) => (
                            <div className={style.cardItemLoading} key={index}>
                                <div className={style.cardItemImgWrapperLoading}></div>
                                <div className={style.wrapperLocationRatingLoadind}>
                                    <span className={style.cardItemLocationNameLoadind}></span>
                                    <span className={style.cardItemRatingLoading}></span>
                                </div>
                                <div className={style.cardItemDate}>
                                    <span className={style.date}></span>
                                </div>
                                <span className={style.cardItemPriceLoading}></span>
                            </div>
                        ))}
                    </div> : 
                    <div className={style.cardItemWrapper}>
                    {
                        dataCardsCategories.map((el) => (
                            <div key={el.id} className={style.cardItem}>
                                <div className={style.cardItemImgWrapper}>
                                   {
                                    el.imageUrls.map((img, index) => (
                                        <img key={index} src={`https://homefuserverback.azurewebsites.net` + img} alt={el.locationName}/>
                                    ))
                                   }
                                </div>
                                <div className={style.wrapperLocationRating}>
                                    <span className={style.cardItemLocationName}>{el.locationName}</span>
                                    <span className={style.cardItemRating}><FontAwesomeIcon icon={faStar} size="sm" style={{color: "#FFD43B",}} /> {el.rating}</span>
                                </div>
                                <div>
                                    <span>
                                        {new Date(el.startDate).getDate()}
                                    </span>
                                    -
                                    {new Date(el.endDate).toLocaleDateString("uk-UA", {
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </div>
                                <span className={style.cardItemPrice}>&#8372; {el.price} ніч</span>
                            </div>
                        ))
                    }
                </div>
                }
            </div>
        </main>
        <FooterMain/>
    </>)
}

export default Home;