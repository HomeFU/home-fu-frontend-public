import { useDispatch } from "react-redux";
import style from "./guestField.module.scss";
import {toggleGuest} from "../../../../../redux/TravelFilter/GuestSlices/guestSlice";
import {closeRegion} from "../../../../../redux/TravelFilter/regionSlice";

export const GuestField = () => {
    const dispatch = useDispatch();

    const openCloseGuestBlock = () => {
        dispatch(toggleGuest()); 
        dispatch(closeRegion());
    };

    return (
        <div className={style.inputSection} onClick={() => {openCloseGuestBlock()}}>
            <div className={style.inputLabel}>Хто</div>
            <input
                type="text"
                placeholder="Додайте гостей"
                className={style.input}
            />
        </div>
    )
}