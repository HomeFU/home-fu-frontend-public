import style from './travel-filter.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DateArrival } from './DateArrival/dateArrival';
import { DateDeparture } from './DateDeparture/dateDeparture';
import { RegionBlock } from './Region/Block/regionBlock';
import { useDispatch, useSelector } from "react-redux";
import { RegionField } from './Region/Field/regionField';
import { GuestField } from './Guest/Field/guestField';
import { GuestBlock } from './Guest/Block/guestBlock';
import { useEffect } from 'react';
import { handlerScrolledFilter } from '../../../redux/TravelFilter/ScrollUpdateFilterSlice/filterUpdateScroll';
import type { RootState } from "..//..//..//redux/store";

export const TravelFilter = () => {
    const showScrolledFilter = useSelector((state: RootState) => state.scrolledFilter.isShowScrolledFilter);
    const isOpenRegionBlock = useSelector((state: RootState) => state.region.isOpen);
    const isOpenGuestBlock = useSelector((state: RootState) => state.guest.isOpen);
    const isOpenArrivalCalendar =  useSelector((state: RootState) => state.arrival.isOpen);
    const isOpenDepartureCalendar = useSelector((state: RootState) => state.departure.isOpen);

    const scrollTop = () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
    }

    const dispatch = useDispatch();

    useEffect(() => {
        const handlerScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            dispatch(handlerScrolledFilter(scrollTop < 19));
        }
        window.addEventListener('scroll', handlerScroll);
        return () => {
            window.removeEventListener('scroll', handlerScroll);
        }
    },[showScrolledFilter])

    const typeRegion = useSelector((state: RootState) => state.region.selectedRegion)
    const selectedDate = useSelector((state: RootState) => state.arrival.selectedDate);
    const selectedDateDeparture = useSelector((state: RootState) => state.departure.selectedDate);
    const counterValue = useSelector((state: RootState) => state.counters.counter)

    // console.log({
    //     LocationId: typeRegion,
    //     CheckInDate: selectedDate,
    //     CheckOutDate: selectedDateDeparture,
    //     Adults: counterValue[0]
    // });

    return (
        <>
            {
                showScrolledFilter ? <div className={`${style.filterWrapper}`}>
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
                </div> : <div className={style.scroledFilter} onClick={scrollTop}>
                    <div className={`${style.filterItem} ${style.anywhere}`}>
                        <div className={style.label}>Будь-куди</div>
                    </div>
                    <div className={style.divider}></div>
                    <div className={`${style.filterItem} ${style.anyWeek}`}>
                        <div className={style.label}>Будь-який тиждень</div>
                    </div>
                    <div className={style.divider}></div>
                    <div className={`${style.filterItem} ${style.guestsCompact}`}>
                    <div className={style.placeholder}>Додайте гостей</div>
                    </div>
                    <button className={`${style.searchButtonSmallFilter} ${style.scrolledButtonSearch}`} onClick={
                        () => {
                            console.log({
                                LocationId: typeRegion,
                                CheckInDate: selectedDate,
                                CheckOutDate: selectedDateDeparture,
                                Adults: counterValue[0]
                            })
                        }
                    }>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' style={{color: "#fff"}}/>
                    </button>
                </div>
            }
        </>
    )
}
