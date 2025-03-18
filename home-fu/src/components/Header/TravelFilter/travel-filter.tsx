// "use client"
import style from './travel-filter.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DateArrival } from './DateArrival/dateArrival';
import { DateDeparture } from './DateDeparture/dateDeparture';
import { RegionBlock } from './Region/Block/regionBlock';
import { useSelector } from "react-redux";
import { RegionField } from './Region/Field/regionField';
import { GuestField } from './Guest/Field/guestField';
import { GuestBlock } from './Guest/Block/guestBlock';
const TravetFilter = () => {
    const isOpenRegionBlock = useSelector((state) => state.region.isOpen);
    const isOpenGuestBlock = useSelector((state) => state.guest.isOpen);
    const isOpenArrivalCalendar =  useSelector((state) => state.arrival.isOpen);
    const isOpenDepartureCalendar = useSelector((state) => state.departure.isOpen);

    return (<>
        <div className={style.filterWrapper}>
            <RegionField/>
            { isOpenRegionBlock && (<RegionBlock/>) }
            <DateArrival/>
            <DateDeparture/>
            <GuestField/>
            { isOpenGuestBlock && (<GuestBlock/>) }
            <button className={style.searchButton}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' style={{color: "#fff"}}/>
                {
                    isOpenRegionBlock || isOpenGuestBlock || isOpenArrivalCalendar || isOpenDepartureCalendar ? (<span className={style.search}>Пошук</span>) : ''
                }
            </button>
        </div>
    </>)
}

export default TravetFilter;