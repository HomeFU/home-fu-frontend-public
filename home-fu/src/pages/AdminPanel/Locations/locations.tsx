import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./locations.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllLocationsForAdmin } from "../../../api/Admin/Locations/getAllLocations";
import { DeleteLocationForAdmin } from "../../../api/Admin/Locations/deleteLocation";
import { AddNewLocation } from "./AddNewLocationForm/addNewLocation";
import { UpdateLocation } from "./UpdateLocationForm/updateLocationForm";
import type { RootState } from '..//..//..//redux/store';
import { openAddLocationForm } from "../../../redux/AdminPanel/adminPanel";


type LocationsModel = {
  id: number;
  name: string;
};

export const Locations = () => {
  const dispatch = useDispatch();
  const isOpenFormForAddNewLocation = useSelector(
    (state: RootState) => state.adminPanel.isOpenAddLocationForm
  );
  const [isOpenFormForUpdateLocation, setOpenFormForUpdateLocation] = useState(false);
  const [idForUpdateLocation, setidForDeleteLocation] = useState<number>(null);
  const [nameForUpdateLocation, setNameForDeleteLocation] = useState<string>('');
  const [responseData, setResponseData] = useState<LocationsModel[]>([]);

  
  const fetchData = async () => {
    try {
      const data = await AllLocationsForAdmin();
      setResponseData(data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  };

  const deleteLocation = async (id:number) => {
    try {
        DeleteLocationForAdmin(id);
        fetchData();
    } catch (error) {
        console.log("Error" + error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const editLocationFunction = (id:number, name:string) => {
    setOpenFormForUpdateLocation((prev) => !prev);
    setNameForDeleteLocation(name);
    setidForDeleteLocation(id);
  }

  const columns = [
    { label: "ID", renderCell: (item: any) => item.id },
    { label: "Name", renderCell: (item: any) => item.name },
    {
      label: "Types",
      renderCell: (item: any) => (
        <div className={style.typesButtons}>
          <button onClick={() => {editLocationFunction(item.id,item.name)}} className={style.editBtn}>Edit</button>
          <button onClick={() => {deleteLocation(item.id)}} className={style.deleteBtn}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className={style.header}>
          <h1>All Locations</h1>
           <button onClick={() => dispatch(openAddLocationForm())}>+ Add Locations</button>
        </div>
        <div className={style.wrapperTable}>
          <CompactTable columns={columns} data={{ nodes: responseData }} />
        </div>
      </div>
      {isOpenFormForAddNewLocation && <AddNewLocation/>}
      {isOpenFormForUpdateLocation && <UpdateLocation id={idForUpdateLocation} name={nameForUpdateLocation}/>}
    </>
  );
};
