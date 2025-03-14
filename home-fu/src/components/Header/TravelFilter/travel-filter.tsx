"use client"
import style from './travel-filter.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DateArrival } from './DateArrival/dateArrival';
import { DateDeparture } from './DateDeparture/dateDeparture';
import { RegionBlock } from './Region/Block/regionBlock';
import { useSelector } from "react-redux";
import { RegionField } from './Region/Field/regionField';
const TravetFilter = () => {
    const isOpen = useSelector((state) => state.region.isOpen);

    return (<>
        <div className={style.filterWrapper}>
            <RegionField/>
            {
                isOpen && (<RegionBlock/>)
            }
            <DateArrival/>
            <DateDeparture/>
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