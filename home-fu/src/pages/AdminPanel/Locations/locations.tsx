import { useEffect, useState } from "react";
import style from "./locations.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllLocationsForAdmin } from "../../../api/Admin/Locations/getAllLocations";
import { DeleteLocationForAdmin } from "../../../api/Admin/Locations/deleteLocation";

type LocationsModel = {
  id: number;
  name: string;
};

export const Locations = () => {
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
    } catch (error) {
        console.log("Error" + error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { label: "ID", renderCell: (item: any) => item.id },
    { label: "Name", renderCell: (item: any) => item.name },
    {
      label: "Types",
      renderCell: (item: any) => (
        <div className={style.typesButtons}>
          <button onClick={() => {console.log("Edit")}} className={style.editBtn}>Edit</button>
          <button onClick={() => {deleteLocation(item.id)}} className={style.deleteBtn}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className={style.header}>
        <h1>All Locations</h1>
        <button>+ Add Locations</button>
      </div>
      <div className={style.wrapperTable}>
        <CompactTable columns={columns} data={{ nodes: responseData }} />
      </div>
    </div>
  );
};
