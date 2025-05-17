import { useEffect, useState } from "react";
import style from "./carsForCategories.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllCardsForCategories } from "../../../api/Admin/CardsCategories/getAllCardsCategories";

type CategoriesCardsModel = {
  id: number;
  name: string;
  locationId: number;
  locationName: string;
  rating: number;
  price: number;
  isDeleted: boolean;
  imageUrls: string;
  categoryIds: number
};

export const CardsForCategories = () => {
  const [responseData, setResponseData] = useState<CategoriesCardsModel[]>([]);

  const fetchData = async () => {
    try {
      const data = await AllCardsForCategories();
      setResponseData(data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { label: "ID", renderCell: (item: any) => item.id },
    { label: "Name", renderCell: (item: any) => item.name },
    { label: "LocationName", renderCell: (item: any) => item.locationName},
    { label: "Rating", renderCell: (item: any) => item.rating  },
    { label: "Price", renderCell: (item: any) => item.price},
    {
        label: "Image",
        renderCell: (item: CategoriesModel) => (
          <img
            src={`https://homefuserverback.azurewebsites.net${item.imageUrls[0]}`}
            alt={item.name}
            width={50}
            height={50}
            style={
                { 
                    objectFit: "cover",
                    borderRadius: "6px",
                    width: "40px",
                    height: "40px"
                }
            }
          />
        ),
    },  
    {
      label: "Types",
      renderCell: (item: any) => (
        <div className={style.typesButtons}>
          <button onClick={() => {console.log("Edit")}} className={style.editBtn}>Edit</button>
          <button className={style.deleteBtn}>Delete</button>
        </div>
      ), 
    },
  ];

  return (
    <div>
      <div className={style.header}>
        <h1>All Cards for Categories</h1>
        <button>+ Add Cards</button>
      </div>
      <div className={style.wrapperTable}>
        <CompactTable columns={columns} data={{ nodes: responseData }} />
      </div>
    </div>
  );
};
