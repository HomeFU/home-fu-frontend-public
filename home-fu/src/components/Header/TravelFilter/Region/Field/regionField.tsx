import style from "./regionField.module.scss"
import { useDispatch, useSelector } from "react-redux";
import {toggleRegion} from "../../../../../redux/TravelFilter/GuestSlices/regionSlice";
import {closeGuest} from "../../../../../redux/TravelFilter/GuestSlices/guestSlice";
import { closeDateDeparture } from "../../../../../redux/DateDepartureSlice/departureSlice";
import { closeDateArrival } from "../../../../../redux/DateArrivalSlice/arrivalSlice";
import { RootState } from "..//..//..//..//..//redux//store"; 

export const RegionField = () => {
    const dispatch = useDispatch();
    const typeRegion = useSelector((state: RootState) => state.region.selectedRegion)

    const openCloseRegionBlock = () => {
        dispatch(toggleRegion())
        dispatch(closeGuest())
        dispatch(closeDateDeparture())
        dispatch(closeDateArrival())
    }

    return (
        <div className={style.wrapperRegionBlock} onClick={() => {openCloseRegionBlock()}}>
            <div className={style.inputLabel}>Куди</div>
            <input autoComplete="off"
                readOnly={true}
                type="text"
                placeholder="Пошук напрямку"
                className={style.input}
                value={typeRegion}
            />
        </div>
    )
}