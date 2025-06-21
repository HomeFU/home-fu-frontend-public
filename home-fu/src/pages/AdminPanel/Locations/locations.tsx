import { useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

  const queryClient = useQueryClient();

  const [idForUpdateLocation, setidForDeleteLocation] = useState<number | null>(null);
  const [nameForUpdateLocation, setNameForUpdateLocation] = useState<string>("");

  const {
    data: fullDataInfoLocations
  } = useQuery<LocationsModel[]>({
    queryKey:['location', 'full'],
    queryFn: () => AllLocationsForAdmin()
  })

  const deleteLocationMutation = useMutation({
    mutationFn: (id: number) => DeleteLocationForAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['location', 'full']});
      alert("Локацію видалено!");
    },
    onError: (error) => {
      console.error("Помилка при видаленні категорії:", error);
      alert("Не вдалося видалити категорію");
    }
  });

  const deleteLocation = (id: number) => {
    deleteLocationMutation.mutate(id);
  };

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
          <CompactTable columns={columns} data={{ nodes: fullDataInfoLocations || [] }} />
        </div>
      </div>
      {isOpenFormForAddNewLocation && <AddNewLocation/>}
      {isOpenFormForUpdateLocation && <UpdateLocation id={idForUpdateLocation} name={nameForUpdateLocation}/>}
    </>
  );
};
