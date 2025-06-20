import style from "./details.module.scss"
import { FooterSite } from "../../components/Footer/FooterSite/footerSite"
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CardDetailsModel } from "../../types/DatailsCard/details"
import { useParams } from "react-router-dom"
import Select from "react-select"
import { CardDetailsApi } from "../../api/CardDetails/cardDetails"
import { HeaderSite } from "../../components/Header/HeaderSite/headerSite"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { LoadingHight } from "../../components/LoadingHight/loadinghight"
import NoUserPhoto from "../../assets/images/noPhotoUser.jpg";
import { CommentsModel } from "../../types/Comments/comments"
import { GoogleMap } from "../../components/Header/GoogleMap/googleMap"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateComment } from "../../api/CardDetails/createComment"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { BookHomeModal } from "..//..//components/BookHome/bookHome"
import { useState } from "react"
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

type Option = {
    value: number;
    label: number;
};

type CommentValidate = {
    text:string;
    value: number;
    cleanliness:number , 
    accuracy:number, 
    checkIn:number, 
    communication:number, 
    location:number
}
export const Details = () => {
    const queryClient = useQueryClient();

    const { id } = useParams<{ id: string }>();
    const isAuthenticatedUser = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const { register, reset, control, handleSubmit } = useForm<CommentValidate>({
        mode: "onChange",
        defaultValues: {
            value: 5,
            cleanliness:5,
            accuracy: 5,
            checkIn: 5,
            communication:5,
            location:5
        },
    });
      
    const options: Option[] = [
        { value: 5, label: 5 },
        { value: 4, label: 4 },
        { value: 3, label: 3 },
        { value: 2, label:2 },
        { value: 1, label: 1 },
    ];
    
    const mutation = useMutation({
        mutationKey: ["createComment"],
        mutationFn: ({ id, text, value, cleanliness, accuracy, checkIn, communication, location }: CommentsModel) =>
            CreateComment({ id, text, value, cleanliness, accuracy, checkIn, communication, location }),
        onSuccess: (_, variables) => {
            alert("Ваш коментар додано!");
            queryClient.invalidateQueries({ queryKey:["cardDetails", variables.id]});
            reset();
        },
        onError: () => {
            alert("Помилка при надсиланні коментаря.");
        },
    });

    const onSubmit: SubmitHandler<CommentValidate> = (data) => {
        const trimmed = data.text.trim();
        if (!trimmed) return;

        mutation.mutate({
            id: id!,
            text: trimmed,
            value: data.value,
            cleanliness: data.cleanliness,
            accuracy: data.accuracy,
            checkIn: data.checkIn,
            communication: data.communication,
            location: data.location,
        });
    };

    const {
        data,
        isLoading,
    } = useQuery<CardDetailsModel>({
        queryKey: ['cardDetails', id],
        queryFn: () => CardDetailsApi(id!),
        enabled: !!id
    });

    return (
        <>
         <HeaderSite/>
            <main className={`${style.main} ${style.mainDetail}`}>
                <div className={style.container}>
                    {
                        isLoading ? <LoadingHight/> : <>
                             <div className={style.mainWrapper}>
                                <div className={style.mainWrapperImageFerstSection}>
                                    <div className={style.wrapperFerstSecondSection}>
                                        <div className={style.firstBlock}>
                                    <div className={style.reserverBlockButtons}>
                                        <div className={style.reserverBlock}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big w-3 h-3 mr-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>    
                                           Миттєве бронювання
                                        </div>
                                        <div className={style.wrapperButtons}>
                                            <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-share w-4 h-4"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" x2="12" y1="2" y2="15"></line></svg>    
                                            Поділиться</button>
                                            <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart w-4 h-4 transition-all duration-300 "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                                            Зберегти</button>
                                        </div>
                                    </div>
                                    <div className={style.wrapperMainContent}>
                                        <div className={style.wrapperNameRating}>
                                            <h1 className={style.title}>{data?.card.name}</h1>
                                            <div className={style.wrapperRatingRocationName}>
                                                <div className={style.wrapperStarRating}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-4 h-4 fill-blue-400 text-blue-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    <span className={style.rating}>{data?.card.rating}</span>
                                                </div>
                                                <div className={style.wrapperLocation}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin w-4 h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    <span className={style.locationName}>{data?.card.locationName}</span>
                                                </div>
                                                <div className={style.wrapperPrice}>
                                                    <span>Ціна: {data?.card.price}$</span>
                                                </div>
                                                <div className={style.wrapperPrice}>
                                                    <span>Дні: </span>
                                                    <span>{data?.card.startDate ? new Date(data.card.startDate).getDate() : ''}</span>
                                                    -
                                                    <span>{data?.card.endDate ? new Date(data.card.endDate).getDate() : ''}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                        <div className={style.hostBlock}>
                                            <div className={style.hostImg}>
                                                <img src={`https://homefu.azurewebsites.net${data?.hostAvatarUrl}`} alt="hostAvatarUrl" />
                                            </div>
                                            <div className={style.blockContent}>
                                                <h2>Господар: {data?.hostName}</h2>
                                                <span>Телефон власника: {data?.hostNum}</span>
                                                <span>Пошта власника: {data?.hostMail}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.wrapperSwiper}>
                                    <Swiper 
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    pagination={{
                                    clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className={style.swiperMy}
                                    >
                                        {data?.card.imageUrls.map((img, index) => (
                                            <SwiperSlide className={style.swiperSlide} key={index}>
                                            <img 
                                                className={style.cardItemImage} 
                                                src={`https://homefu.azurewebsites.net${img}`} 
                                                alt='card image' 
                                                loading="lazy"
                                            />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    </div>
                                </div>
                                <button className={style.reserveButton}onClick={() => setIsBookingModalOpen(true)}>Зарезервувати</button>
                                <div className={style.mainDescriptionBlock}>
                                    <div className={style.wrapperDescriptionStar}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-5 h-5 text-blue-500"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                                        <h3 className={style.descriptionTitle}>Опис</h3>
                                    </div>
                                    <p className={style.description}>{data?.description}</p>
                                </div>
                                <div className={style.wrapperAnyData}>
                                        <div className={style.wrapperAnyDataGred}>
                                            <div className={style.wrapperAnyDataGredItem}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users w-8 h-8 mx-auto mb-2 text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                <span>{data?.numberOfGuests}</span>
                                                <span>Гостей</span>
                                            </div>
                                            <div className={style.wrapperAnyDataGredItem}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-home w-8 h-8 mx-auto mb-2 text-blue-700"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                                <span>{data?.numberOfBedrooms}</span>
                                                <span>Спален</span>
                                            </div>
                                            <div className={style.wrapperAnyDataGredItem}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bed w-8 h-8 mx-auto mb-2 text-blue-800"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
                                                <span>{data?.numberOfBeds}</span>
                                                <span>Ліжків</span>
                                            </div>
                                            <div className={style.wrapperAnyDataGredItem}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bath w-8 h-8 mx-auto mb-2 text-cyan-600"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path><line x1="10" x2="8" y1="5" y2="7"></line><line x1="2" x2="22" y1="12" y2="12"></line><line x1="7" x2="7" y1="19" y2="21"></line><line x1="17" x2="17" y1="19" y2="21"></line></svg>
                                                <span>{data?.numberOfBathrooms}</span>
                                                <span>Ванних</span>
                                            </div>
                                        </div>
                                </div>
                                <div className={style.premiumApartament}>
                                    <div className={style.wrapperPremiumApartament}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-crown w-5 h-5 text-blue-600"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
                                        <h3 className={style.descriptionTitle}>Преміум зручності</h3>
                                    </div>
                                <div className={style.mainWrapperAmenitiesCard}>
                                    {
                                        data?.amenities.map((el) => (
                                            <div className={style.premiumApartamentAmenitiesCard} key={el.id}>
                                                <img className={style.amenitiesImg} src={`https://homefu.azurewebsites.net${el.imageUrl}`} alt="icon" />
                                                <p>{el.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                </div>
                                <div className={style.clientStarBlock}>
                                    <div className={style.wrapperClientStarBlock}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-crown w-5 h-5 text-blue-600"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
                                        <h3>Рейтинги гостей</h3>
                                    </div>
                                    <div className={style.gridUserRating}>
                                        <div className={style.cardItem}>
                                            <div className={style.cardItemRating}>{data?.ratings.cleanliness.toFixed(0)}</div>
                                            <p>Чистота</p>
                                            <div className={style.wrapperCounterStars}>
                                                {Number(data?.ratings.cleanliness) > 0 &&
                                                    Array.from({ length: Number(data?.ratings.cleanliness) }, (_, i) => (
                                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-3 h-3 text-blue-400 fill-blue-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={style.cardItem}>
                                            <div className={style.cardItemRating}>{data?.ratings.accuracy.toFixed(0)}</div>
                                            <p>Точність</p>
                                            <div className={style.wrapperCounterStars}>
                                                {Number(data?.ratings.accuracy) > 0 &&
                                                    Array.from({ length: Number(data?.ratings.accuracy) }, (_, i) => (
                                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-3 h-3 text-blue-400 fill-blue-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={style.cardItem}>
                                            <div className={style.cardItemRating}>{data?.ratings.checkIn.toFixed(0)}</div>
                                            <p>Прибуття</p>
                                            <div className={style.wrapperCounterStars}>
                                                {Number(data?.ratings.checkIn) > 0 &&
                                                    Array.from({ length: Number(data?.ratings.checkIn) }, (_, i) => (
                                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-3 h-3 text-blue-400 fill-blue-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={style.cardItem}>
                                            <div className={style.cardItemRating}>{data?.ratings.communication.toFixed(0)}</div>
                                            <p>Комунікація</p>
                                            <div className={style.wrapperCounterStars}>
                                                {Number(data?.ratings.communication) > 0 &&
                                                    Array.from({ length: Number(data?.ratings.communication) }, (_, i) => (
                                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-3 h-3 text-blue-400 fill-blue-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={style.cardItem}>
                                            <div className={style.cardItemRating}>{data?.ratings.location.toFixed(0)}</div>
                                            <p>Розташування</p>
                                            <div className={style.wrapperCounterStars}>
                                                {Number(data?.ratings.location) > 0 &&
                                                    Array.from({ length: Number(data?.ratings.location) }, (_, i) => (
                                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-3 h-3 text-blue-400 fill-blue-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={style.cardItem}>
                                            <div className={style.cardItemRating}>{data?.ratings.value.toFixed(0)}</div>
                                            <p>Ціни</p>
                                            <div className={style.wrapperCounterStars}>
                                                {Number(data?.ratings.value) > 0 &&
                                                    Array.from({ length: Number(data?.ratings.value) }, (_, i) => (
                                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-3 h-3 text-blue-400 fill-blue-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.commentGuest}>
                                    <div className={style.wrapperCommentGuestHead}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-5 h-5 text-blue-500"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                                        <h3>Відгукі гостей</h3>
                                    </div>
                                    <div className={style.wrapperCommentGuest}>
                                        {
                                            data?.reviews.map((el) => (
                                                <div className={style.commentItem} key={el.id}>
                                                    <div className={style.commentItemHead}>
                                                        <div className={style.commentItemBlockImg}>
                                                        {
                                                            el.userProfileImageUrl !== null
                                                            ?  <img className={style.userImage} loading="lazy" src={`https://homefu.azurewebsites.net${el.userProfileImageUrl}`} alt="userPhoto" /> 
                                                            : <img className={style.userImage} loading="lazy" src={NoUserPhoto} alt="userPhoto" />
                                                        }
                                                        </div>
                                                        <div className={style.wrapperNameStar}>
                                                            <span>{el.userName}</span>
                                                            <span>
                                                                {Number(el.overallRating) > 0 &&
                                                                    Array.from({ length: Number(el.overallRating) }, (_, i) => (
                                                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-3 h-3 text-blue-400 fill-blue-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                    ))
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={style.wrapperCreatedAt}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar _7QGNqa_metaIcon"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                                                        <span>{el.createdAt.split('T')[0]}</span>
                                                    </div>
                                                    <div className={style.blockComment}>{el.text}</div>
                                                    <div><span>Загальний рейтинг: {el.overallRating != null ? Number(el.overallRating).toFixed(0) : '0'}</span></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>  
                                {isAuthenticatedUser && (
                                    <div className={style.createCommentBlock}>
                                        <h3 className={style.title}>Залишити коментар</h3>

                                        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                                        <textarea
                                            {...register("text")}
                                            className={style.textarea}
                                            placeholder="Напишіть свій коментар..."
                                        />
                                        <div className={style.wrapperSelectType}>
                                            <p>Додайте оцінку</p>
                                            <Controller
                                        control={control}
                                        name="value"
                                        render={({ field }) => (
                                            <Select
                                            {...field}
                                            options={options}
                                            placeholder="Додайте оцінку"
                                            value={options.find((option) => option.value === field.value)}
                                            onChange={(option) => field.onChange(option?.value)}
                                            styles={{
                                                control: (base) => ({
                                                ...base,
                                                border: "none",
                                                borderBottom: "1px solid #ccc",
                                                borderRadius: 0,
                                                boxShadow: "none",
                                                backgroundColor: "transparent",
                                                minHeight: "40px",
                                                padding: 0,
                                                overflow: "visible",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    overflow: "visible",
                                                }),
                                                indicatorSeparator: () => ({
                                                display: "none",
                                                }),
                                                valueContainer: (base) => ({
                                                ...base,
                                                padding: 0,
                                                }),
                                            }}
                                            />
                                        )}
                                        />
                                        </div>
                                        <div className={style.wrapperSelectType}>
                                            <p>Додайте оцінку чистоти</p>
                                                                                    <Controller
                                        control={control}
                                        name="cleanliness"
                                        render={({ field }) => (
                                            <Select
                                            {...field}
                                            options={options}
                                            placeholder="Додайте оцінку чистоти"
                                            value={options.find((option) => option.value === field.value)}
                                            onChange={(option) => field.onChange(option?.value)}
                                            styles={{
                                                control: (base) => ({
                                                ...base,
                                                border: "none",
                                                borderBottom: "1px solid #ccc",
                                                borderRadius: 0,
                                                boxShadow: "none",
                                                backgroundColor: "transparent",
                                                minHeight: "40px",
                                                padding: 0,
                                                overflow: "visible",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    overflow: "visible",
                                                }),
                                                indicatorSeparator: () => ({
                                                display: "none",
                                                }),
                                                valueContainer: (base) => ({
                                                ...base,
                                                padding: 0,
                                                }),
                                            }}
                                            />
                                        )}
                                        />
                                        </div>
                                        <div className={style.wrapperSelectType}>
                                            <p>Додайте оцінку точністі</p>
                                            <Controller
                                        control={control}
                                        name="accuracy"
                                        render={({ field }) => (
                                            <Select
                                            {...field}
                                            options={options}
                                            placeholder="Додайте оцінку точність"
                                            value={options.find((option) => option.value === field.value)}
                                            onChange={(option) => field.onChange(option?.value)}
                                            styles={{
                                                control: (base) => ({
                                                ...base,
                                                border: "none",
                                                borderBottom: "1px solid #ccc",
                                                borderRadius: 0,
                                                boxShadow: "none",
                                                backgroundColor: "transparent",
                                                minHeight: "40px",
                                                padding: 0,
                                                overflow: "visible",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    overflow: "visible",
                                                }),
                                                indicatorSeparator: () => ({
                                                display: "none",
                                                }),
                                                valueContainer: (base) => ({
                                                ...base,
                                                padding: 0,
                                                }),
                                            }}
                                            />
                                        )}
                                        />
                                        </div>
                                        <div className={style.wrapperSelectType}>
                                            <p>Додайте оцінку прибуття</p>
                                                                                    <Controller
                                        control={control}
                                        name="checkIn"
                                        render={({ field }) => (
                                            <Select
                                            {...field}
                                            options={options}
                                            placeholder="Додайте оцінку прибуття"
                                            value={options.find((option) => option.value === field.value)}
                                            onChange={(option) => field.onChange(option?.value)}
                                            styles={{
                                                control: (base) => ({
                                                ...base,
                                                border: "none",
                                                borderBottom: "1px solid #ccc",
                                                borderRadius: 0,
                                                boxShadow: "none",
                                                backgroundColor: "transparent",
                                                minHeight: "40px",
                                                padding: 0,
                                                overflow: "visible",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    overflow: "visible",
                                                }),
                                                indicatorSeparator: () => ({
                                                display: "none",
                                                }),
                                                valueContainer: (base) => ({
                                                ...base,
                                                padding: 0,
                                                }),
                                            }}
                                            />
                                        )}
                                        />
                                        </div>
                                        <div className={style.wrapperSelectType}>
                                            <p>Додайте оцінку комунікації</p>
                                            <Controller
                                        control={control}
                                        name="communication"
                                        render={({ field }) => (
                                            <Select
                                            {...field}
                                            options={options}
                                            placeholder="Додайте оцінку комунікації"
                                            value={options.find((option) => option.value === field.value)}
                                            onChange={(option) => field.onChange(option?.value)}
                                            styles={{
                                                control: (base) => ({
                                                ...base,
                                                border: "none",
                                                borderBottom: "1px solid #ccc",
                                                borderRadius: 0,
                                                boxShadow: "none",
                                                backgroundColor: "transparent",
                                                minHeight: "40px",
                                                padding: 0,
                                                overflow: "visible",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    overflow: "visible",
                                                }),
                                                indicatorSeparator: () => ({
                                                display: "none",
                                                }),
                                                valueContainer: (base) => ({
                                                ...base,
                                                padding: 0,
                                                }),
                                            }}
                                            />
                                        )}
                                        />
                                        </div>
                                        <div className={style.wrapperSelectType}>
                                            <p>Додайте оцінку розташування</p>
                                            <Controller
                                        control={control}
                                        name="location"
                                        render={({ field }) => (
                                            <Select
                                            {...field}
                                            options={options}
                                            placeholder="Додайте оцінку розташування"
                                            value={options.find((option) => option.value === field.value)}
                                            onChange={(option) => field.onChange(option?.value)}
                                            styles={{
                                                control: (base) => ({
                                                ...base,
                                                border: "none",
                                                borderBottom: "1px solid #ccc",
                                                borderRadius: 0,
                                                boxShadow: "none",
                                                backgroundColor: "transparent",
                                                minHeight: "40px",
                                                padding: 0,
                                                overflow: "visible",
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    overflow: "visible",
                                                }),
                                                indicatorSeparator: () => ({
                                                display: "none",
                                                }),
                                                valueContainer: (base) => ({
                                                ...base,
                                                padding: 0,
                                                }),
                                            }}
                                            />
                                        )}
                                        />
                                        </div>
                                        <button type="submit" className={style.button}>
                                            Надіслати
                                        </button>
                                        </form>
                                    </div>
                                )}
                                {isBookingModalOpen && data && (
                                <BookHomeModal
                                    price={data.card.price}
                                    onClose={() => setIsBookingModalOpen(false)}
                                    maxGuests={data.numberOfGuests}
                                    cardId={data.card.id}
                                />
                                )}
                                <div>
                                    
                                </div>
                            </div>
                        </>
                    }
                </div>
                 <div className={style.map}><GoogleMap/></div> 
                <div className={style.divider}></div>
            </main>
         <FooterSite/>
        </>
    )
}