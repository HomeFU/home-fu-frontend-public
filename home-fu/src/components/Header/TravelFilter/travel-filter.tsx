import style from './travel-filter.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DateArrival } from './DateArrival/dateArrival';
import { DateDeparture } from './DateDeparture/dateDeparture';
import { RegionBlock } from './Region/Block/regionBlock';
import { RegionField } from './Region/Field/regionField';
import { GuestField } from './Guest/Field/guestField';
import { GuestBlock } from './Guest/Block/guestBlock';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { handlerScrolledFilter } from '../../../redux/TravelFilter/ScrollUpdateFilterSlice/filterUpdateScroll';
import { setFilters } from '../../../redux/CardsCategoryFilter/filterSlice';
import type { RootState } from "../../../redux/store";

type TravelFilterProps = {
    onSearch?: (params: { CheckOutDate: string }) => void;
};

export const TravelFilter = ({ onSearch }: TravelFilterProps) => {
    const dispatch = useDispatch();

    const showScrolledFilter = useSelector((state: RootState) => state.scrolledFilter.isShowScrolledFilter);
    const isOpenRegionBlock = useSelector((state: RootState) => state.region.isOpen);
    const isOpenGuestBlock = useSelector((state: RootState) => state.guest.isOpen);
    const isOpenArrivalCalendar = useSelector((state: RootState) => state.arrival.isOpen);
    const isOpenDepartureCalendar = useSelector((state: RootState) => state.departure.isOpen);

    const selectedDateDeparture = useSelector((state: RootState) => state.departure.selectedDate);
    const selectedDateArival = useSelector((state: RootState) => state.arrival.selectedDate);

    useEffect(() => {
        const handlerScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            dispatch(handlerScrolledFilter(scrollTop < 19));
        };
        window.addEventListener('scroll', handlerScroll);
        return () => {
            window.removeEventListener('scroll', handlerScroll);
        };
    }, [dispatch]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearch = () => {
        if (selectedDateDeparture) {
            const filterPayload = {
                CheckOutDate: selectedDateDeparture,
                CheckInDate: selectedDateArival
            };

            dispatch(setFilters(filterPayload)); // сохранить в Redux

            if (onSearch) {
                onSearch(filterPayload); // запустить useFilterSearch (если передали)
            }
        }
    };

    return (
        <>
            {showScrolledFilter ? (
                <div className={style.filterWrapper}>
                    <RegionField />
                    {isOpenRegionBlock && <RegionBlock />}
                    <DateArrival />
                    <DateDeparture />
                    <GuestField />
                    {isOpenGuestBlock && <GuestBlock />}
                    <button className={style.searchButton} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' style={{ color: "#fff" }} />
                        {(isOpenRegionBlock || isOpenGuestBlock || isOpenArrivalCalendar || isOpenDepartureCalendar) && (
                            <span className={style.search}>Пошук</span>
                        )}
                    </button>
                </div>
            ) : (
                <div className={style.scroledFilter} onClick={scrollTop}>
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
                    <button className={`${style.searchButtonSmallFilter} ${style.scrolledButtonSearch}`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' style={{ color: "#fff" }} />
                    </button>
                </div>
            )}
        </>
    );
};
