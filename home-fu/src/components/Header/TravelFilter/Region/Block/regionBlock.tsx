import style from "./regionBlock.module.scss";
import {setSelectRegion, setSelectRegionId} from "../../../../../redux/TravelFilter/GuestSlices/regionSlice";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { LocationModel } from "../../../../../types/Locations/locations";
import { Locations } from "../../../../../api/Locations/locations";

export const RegionBlock = () => {
    const dispatch = useDispatch();

    const {
        data: dataLocations = []
    } = useQuery<LocationModel[]>({
        queryKey:['locations'],
        queryFn: () => Locations()
    });

    const handleLocations = (id:number, name:string) => {
        dispatch(setSelectRegion(name));
         dispatch(setSelectRegionId(id));
    }

    return (
        <div className={style.wrapperRegionBlock}>
            <h2 className={style.title}>Пошук за регіонами</h2>
            <div className={style.regionType}>
                {
                    dataLocations.map((region) => (
                        <div className={style.typeRegion} key={region.id} onClick={() => {handleLocations(region.id, region.name)}}>
                            <span>{region.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}