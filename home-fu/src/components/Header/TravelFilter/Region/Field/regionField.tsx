import style from "./regionField.module.scss"
import { useDispatch, useSelector } from "react-redux";
import {toggleRegion} from "../../../../../redux/TravelFilter/regionSlice";
import {closeGuest} from "../../../../../redux/TravelFilter/GuestSlices/guestSlice";

export const RegionField = () => {
    const dispatch = useDispatch();
    const typeRegion = useSelector((state) => state.region.selectedRegion)

    const openCloseRegionBlock = () => {
        dispatch(toggleRegion())
        dispatch(closeGuest())
    }

    return (
        <div className={style.wrapperRegionBlock} onClick={() => {openCloseRegionBlock()}}>
            <div className={style.inputLabel}>Куди</div>
            <input
                readOnly={true}
                type="text"
                placeholder="Пошук напрямку"
                className={style.input}
                value={typeRegion}
            />
        </div>
    )
}