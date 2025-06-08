import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./locations.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllLocationsForAdmin } from "../../../api/Admin/Locations/getAllLocations";
import { DeleteLocationForAdmin } from "../../../api/Admin/Locations/deleteLocation";
import { AddNewLocation } from "./AddNewLocationForm/addNewLocation";
import { UpdateLocation } from "./UpdateLocationForm/updateLocationForm";
import { openUpdateLocationForm } from "../../../redux/AdminPanel/editPanelFirst";
import type { RootState } from '../../../redux/store';
import { openAddLocationForm } from "../../../redux/AdminPanel/adminPanel";

type LocationsModel = {
  id: number;
  name: string;
};

export const Locations = () => {
  const dispatch = useDispatch();

  const isOpenFormForAddNewLocation = useSelector(
    (state: RootState) => state.adminPanelAddLocation.isOpenAddLocationForm
  );
  const isOpenFormForUpdateLocation = useSelector(
    (state: RootState) => state.adminupdateLocationForm.isOpenUpdateLocationForm
  );

  const [idForUpdateLocation, setidForDeleteLocation] = useState<number | null>(null);
  const [nameForUpdateLocation, setNameForUpdateLocation] = useState<string>("");
  const [responseData, setResponseData] = useState<LocationsModel[]>([]);

  const fetchData = async () => {
    try {
      const data = await AllLocationsForAdmin();
      setResponseData(data);
    } catch (error) {
      console.error("Error loading locations", error);
    }
  };

  const deleteLocation = async (id: number) => {
    try {
      await DeleteLocationForAdmin(id);
      fetchData();
    } catch (error) {
      console.log("Error deleting location: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editLocationFunction = (id: number, name: string) => {
    setidForDeleteLocation(id);
    setNameForUpdateLocation(name);
    dispatch(openUpdateLocationForm({ isOpen: true }));
  };

  const columns = [
    { label: "ID", renderCell: (item: LocationsModel) => item.id },
    { label: "Name", renderCell: (item: LocationsModel) => item.name },
    {
      label: "Actions",
      renderCell: (item: LocationsModel) => (
        <div className={style.typesButtons}>
          <button onClick={() => editLocationFunction(item.id, item.name)} className={style.editBtn}>Edit</button>
          <button onClick={() => deleteLocation(item.id)} className={style.deleteBtn}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className={style.header}>
          <h1>All Locations</h1>
          <button onClick={() => dispatch(openAddLocationForm())}>+ Add Location</button>
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
