import { faHouseUser, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "./noCategoriesResults.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const NoResultsCategories = () => {
    return (
      <div className={style.wrapper}>
        <div className={style.wrapperPlusIcon}><FontAwesomeIcon className={style.plusIcon} size="sm" style={{color: "#FFF",}} icon={faPlus}/></div>
        <div className={style.wrapperHomeIcon}><FontAwesomeIcon className={style.homeIcon} size="sm" style={{color: "#FFF",}} icon={faHouseUser} /></div>
        <div className={style.iconContainer}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#FFF",}} />
        </div>
        <h2 className={style.title}>Нічого не знайдено</h2>
        <p className={style.description}>
          На жаль, за вашими критеріями пошуку не знайдено жодного помешкання.
          Спробуйте змінити параметри пошуку або перегляньте інші категорії.
        </p>
        <div className={style.hintText}>
            Змініть категорію у меню вище, щоб побачити доступні помешкання
        </div>
      </div>
    );
  };