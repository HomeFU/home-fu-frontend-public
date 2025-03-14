import style from "./regionField.module.scss"
import { useDispatch } from "react-redux";
import {toggleRegion} from "../../../../../redux/TravelFilter/regionSlice";

export const RegionField = () => {
    const dispatch = useDispatch();

    return (
        <div className={style.wrapperRegionBlock} onClick={() => {dispatch(toggleRegion())}}>
            <div className={style.inputLabel}>Куди</div>
            <input
                type="text"
                placeholder="Пошук напрямку"
                className={style.input}
            />
        </div>
    )
}