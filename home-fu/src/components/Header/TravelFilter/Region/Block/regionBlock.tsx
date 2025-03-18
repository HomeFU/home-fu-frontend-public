import style from "./regionBlock.module.scss";
import flexibleRegion from "../../../../../assets/regions/flexibleSearchRegionImage.png";
import middleEast from "../../../../../assets/regions/middleEastRegionImage.png";
import romania from "../../../../../assets/regions/romaniaRegionImage.png";
import southeast from "../../../../../assets/regions/southeastRegionImage.png";
import italy from "../../../../../assets/regions/italyRegionImage.png";
import unitedStates from "../../../../../assets/regions/unitedStatesRegionImage.png";
import {setSelectRegion} from "../../../../../redux/TravelFilter/regionSlice";
import { useDispatch } from "react-redux";

type regionsType = {
    id: number,
    img: string,
    lable: string
}

const regions:regionsType[] = [
   {id:1, img:flexibleRegion, lable:"Гнучкий пошук"},
   {id:2, img:middleEast, lable:"Близький Схід"},
   {id:3, img:romania, lable:"Румунія"},
   {id:4, img:southeast, lable:"Південно-Східний"},
   {id:5, img:italy, lable:"Італія"},
   {id:6, img:unitedStates, lable:"Сполучені Штати"},
];

export const RegionBlock = () => {
    const dispatch = useDispatch();

    return (
        <div className={style.wrapperRegionBlock}>
            <h2 className={style.title}>Пошук за регіонами</h2>
            <div className={style.regionType}>
                {
                    regions.map((region) => (
                        <div className={style.typeRegion} key={region.id} onClick={() => {dispatch(setSelectRegion(region.lable))}}>
                            <img src={region.img} alt={region.img} />
                            <span>{region.lable}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}