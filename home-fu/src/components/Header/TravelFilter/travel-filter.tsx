import style from './travel-filter.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const TravetFilter = () => {

    return (<>
        <div className={style.filterWrapper}>
            <div className={style.inputSection}>
                <div className={style.inputLabel}>Куди</div>
                <input
                    type="text"
                    placeholder="Пошук напрямку"
                    className={style.input}
                />
            </div>
            <div className={style.inputSection}>
                <div className={style.inputLabel}>Прибуття</div>
                <input
                    type="text"
                    placeholder="Додайте дату"
                    className={style.input}
                />
            </div>
            <div className={style.inputSection}>
                <div className={style.inputLabel}>Виїзд</div>
                <input
                    type="text"
                    placeholder="Додайте дату"
                    className={style.input}
                />
            </div>
            <div className={style.inputSection}>
                <div className={style.inputLabel}>Хто</div>
                <input
                    type="text"
                    placeholder="Додайте гостей"
                    className={style.input}
                />
            </div>
            <button className={style.searchButton}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' style={{color: "#fff"}}/>
            </button>
        </div>
    </>)
}

export default TravetFilter;