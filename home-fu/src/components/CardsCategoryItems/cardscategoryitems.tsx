import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { CardsCategoriesModel } from "../../types/Categories/cardsCategories";
import style from "./cardscategoryitems.module.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RestoreCard } from "../../api/CardDetails/restoreCard";

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/effect-fade';

type CardsListProps = {
  dataCardsCategories: CardsCategoriesModel[]; 
}

export const CardsList = ({ dataCardsCategories }: CardsListProps) => {
  const queryClient = useQueryClient();

  const { 
    mutate: restoreCard 
  } = useMutation({
    mutationFn: RestoreCard,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cardsCategories']});
      alert('Карточка відновлена');
    },
    onError: (error) => {
      console.error('Ошибка восстановления карточки', error);
    },
  });

  const isUserAdmin = localStorage.getItem("isAdminUser");

  return (
    <div className={style.container}>
      <div className={style.cardItemWrapper}>
        {dataCardsCategories.map((el) => (
           <Link target="_blank" to={`/carddetails/${el.id}`} key={el.id} className={`${style.cardItem} ${isUserAdmin !== "Admin" && el.isDeleted ? style.hiddenItem : ''}`}>
            <div className={`${el.isDeleted ? style.restoreBlock : ''}`} onClick={(e) => {
              e.preventDefault();
              restoreCard(el.id)}}
            ></div>
           <Swiper 
             effect={'fade'} 
             navigation={true} 
             pagination={true} 
             modules={[EffectFade, Navigation, Pagination]} 
             className={style.swiperMy}
           >
             {el.imageUrls.map((img, index) => (
               <SwiperSlide className={style.swiperSlide} key={index}>
                 <img 
                   className={style.cardItemImage} 
                   src={`https://homefu.azurewebsites.net${img}`} 
                   alt={el.locationName} 
                   loading="lazy"
                 />
               </SwiperSlide>
             ))}
           </Swiper>
           <div className={style.wrapperLocationRating}>
             <p className={style.cardItemLocationName}>{el.name}</p>
             <span className={style.cardItemRating}>
               <FontAwesomeIcon 
                 icon={faStar} 
                 size="sm" 
                 style={{ color: "#FFD43B" }} 
               /> 
               {el.rating}
             </span>
           </div>
           <div>
             <span>{new Date(el.startDate).getDate()}</span>
             -
             {new Date(el.endDate).toLocaleDateString("uk-UA", {
               day: "numeric",
               month: "long",
             })}
           </div>
           <span className={style.cardItemPrice}>$ {el.price} ніч</span>
         </Link>
        ))}
      </div>
    </div>
  );
};