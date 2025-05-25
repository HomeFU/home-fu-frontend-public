import { Header } from "../../components/Header/HeaderMain/header";
import { FooterMain } from "../../components/Footer/FooterMain/footerMain";
import { CardsCategories } from "../../api/Categories/cardsCategories";
import { useEffect } from "react";
import { setSelectedCategori } from "../../redux/CategoryFilter/CategorySlice/categorySlice";
import { useSearchParams } from "react-router-dom";
import style from "./home.module.scss";
import { useDispatch } from "react-redux";
import { NoResultsCategories } from "../../components/NoCategoriesResults/noCategoriesResults";
import { useQuery } from "@tanstack/react-query";
import { CardsCategoriesModel } from "../../types/Categories/cardsCategories";
import { CardsList } from "..//..//components/CardsCategoryItems/cardscategoryitems";
import { LoadingHight } from "..//../components/LoadingHight/loadinghight";


export const Home = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const categoryIdFromUrl = parseInt(searchParams.get("category") || "1");


    const {
        data: dataCardsCategories = [],
        isLoading,
        isError,
    } = useQuery<CardsCategoriesModel[]>({
        queryKey: ['cardsCategories', categoryIdFromUrl],
        queryFn: () => CardsCategories(categoryIdFromUrl)
    });


    useEffect(() => {
        dispatch(setSelectedCategori(categoryIdFromUrl));
    }, [categoryIdFromUrl, dispatch]);
   
    return (
        <>
            <Header/>
            <main className={style.main}>
                {isLoading ? <LoadingHight />
                 : isError ? <NoResultsCategories/>
                 : <CardsList dataCardsCategories={dataCardsCategories} />}
            </main>
            <FooterMain/>
        </>
    );
};
