import style from './loadinghight.module.scss'; 

export const LoadingHight = () => {
  return (
    <div className={style.container}>
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
    </div>
  );
};