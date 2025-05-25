import { Header } from "../../components/Header/HeaderMain/header";
import { FooterMain } from "../../components/Footer/FooterMain/footerMain";
import { CardsCategories } from "../../api/Categories/cardsCategories";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { setSelectedCategori } from "../../redux/CategoryFilter/CategorySlice/categorySlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useSearchParams } from "react-router-dom";
import style from "./home.module.scss";
import { useDispatch } from "react-redux";
import { NoResultsCategories } from "../../components/NoCategoriesResults/noCategoriesResults";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { useQuery } from "@tanstack/react-query";
import { CardsCategoriesModel } from "../../types/Categories/cardsCategories";

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
    })

    useEffect(() => {
        dispatch(setSelectedCategori(categoryIdFromUrl));
    },[categoryIdFromUrl])
   
    return (<>
        <Header/>
        <main className={style.main}>
            {
                isLoading ?  <div className={style.container}>
                    <div className={style.cardItemWrapperLoading}>
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
                    </div>
                </div> : isError ? <NoResultsCategories/> :
                <div className={style.container}>
                    <div className={style.cardItemWrapper}>
                        {
                            dataCardsCategories.map((el) => (
                                <div key={el.id} className={style.cardItem}>
                                    <Swiper effect={'fade'} navigation={true} pagination={true} modules={[EffectFade , Navigation, Pagination]} className={style.swiperMy}>
                                        {
                                            el.imageUrls.map((img, index) => (
                                                <SwiperSlide className={style.swiperSlide} key={index}><img className={style.cardItemImage} src={`https://homefuserverback.azurewebsites.net` + img} alt={el.locationName} /></SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
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
                </div>
            }
        </main>
        <FooterMain/>
    </>)
}