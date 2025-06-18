import { Header } from "../../components/Header/HeaderMain/header";
import { FooterMain } from "../../components/Footer/FooterMain/footerMain";
import { CardsCategories } from "../../api/Categories/cardsCategories";
import { useEffect, useState } from "react";
import { setSelectedCategori } from "../../redux/CategoryFilter/CategorySlice/categorySlice";
import { useSearchParams } from "react-router-dom";
import style from "./home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NoResultsCategories } from "../../components/NoCategoriesResults/noCategoriesResults";
import { useQuery } from "@tanstack/react-query";
import { CardsCategoriesModel } from "../../types/Categories/cardsCategories";
import { CardsList } from "../../components/CardsCategoryItems/cardscategoryitems";
import { LoadingHight } from "../../components/LoadingHight/loadinghight";
import { SearchParams } from "../../types/SearchParams/searchParams";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { useHightSearch } from "../../hooks/useHightSearch";
import { RootState } from "../../redux/store";

export const Home = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = useSelector((state: RootState) => state.search.SearchTerm);

    const categoryParam = searchParams.get("category");
    const categoryIdFromUrl = categoryParam ? parseInt(categoryParam) : undefined;

    const [filterParams, setFilterParams] = useState<SearchParams | null>(null);

    // 🔹 Извлекаем параметры фильтра из URL
    useEffect(() => {
        const urlParams = Object.fromEntries([...searchParams.entries()]);
        const extractedParams: SearchParams = {
            CheckInDate: urlParams.CheckInDate || undefined,
            CheckOutDate: urlParams.CheckOutDate || undefined,
            Adults: urlParams.Adults ? Number(urlParams.Adults) : undefined,
            Children: urlParams.Children ? Number(urlParams.Children) : undefined,
            LocationId: urlParams.LocationId ? Number(urlParams.LocationId) : undefined,
        };

        const hasAnyFilter = Object.values(extractedParams).some(v => v !== undefined);
        if (hasAnyFilter) {
            setFilterParams(extractedParams);
        } else {
            setFilterParams(null);
        }
    }, [searchParams]);

    // 🔹 Без фильтра — стандартный запрос по категории
    const {
        data: dataCardsCategories = [],
        isLoading: isLoadingDefault,
        isError: isErrorDefault,
    } = useQuery<CardsCategoriesModel[]>({
        queryKey: ['cardsCategories', categoryIdFromUrl ?? 'default'],
        queryFn: () => CardsCategories(categoryIdFromUrl ?? 1),
        enabled: !filterParams && !searchTerm, // Не выполняем, если есть поиск или фильтры
    });

    // 🔹 С фильтрами (даты, гости и т.д.)
    const {
        data: filterCards = [],
        isLoading: isLoadingFiltered,
        isError: isErrorFiltered,
    } = useFilterSearch(filterParams);

    // 🔹 С поиском по тексту (SearchTerm)
const { 
    data: searchResults = [], 
    isLoading: isSearchLoading 
} = useHightSearch(searchTerm ? { SearchTerm: searchTerm } : null);


    // 🔹 Установка категории в Redux
    useEffect(() => {
        if (categoryIdFromUrl) {
            dispatch(setSelectedCategori(categoryIdFromUrl));
        }
    }, [categoryIdFromUrl, dispatch]);

    // 🔹 Поиск — обновление фильтра и URL
    const handleApplyFilter = (params: SearchParams) => {
        setFilterParams(params);

        const queryParams: Record<string, string> = {};

        if (categoryIdFromUrl) {
            queryParams.category = categoryIdFromUrl.toString();
        }

        if (params.CheckInDate) queryParams.CheckInDate = params.CheckInDate;
        if (params.CheckOutDate) queryParams.CheckOutDate = params.CheckOutDate;
        if (params.Adults !== undefined) queryParams.Adults = params.Adults.toString();
        if (params.Children !== undefined) queryParams.Children = params.Children.toString();
        if (params.LocationId !== undefined) queryParams.LocationId = params.LocationId.toString();

        setSearchParams(queryParams);
    };

    // 🔹 Определяем, какие данные показывать
    const getDataToRender = () => {
        if (searchTerm) {
            return searchResults; // Приоритет у поиска
        }
        if (filterParams) {
            return filterCards; // Затем фильтры
        }
        return dataCardsCategories; // Иначе базовые данные
    };

    const isLoading = isSearchLoading || isLoadingFiltered || isLoadingDefault;
    const isError =   isErrorFiltered || isErrorDefault;
    const data = getDataToRender();

    return (
        <>
            <Header onSearch={handleApplyFilter} />

            <main className={style.main}>
                {isLoading ? (
                    <LoadingHight />
                ) : isError ? (
                    <NoResultsCategories />
                ) : data.length > 0 ? (
                    <CardsList dataCardsCategories={data} />
                ) : (
                    <NoResultsCategories />
                )}
            </main>

            <FooterMain />
        </>
    );
};