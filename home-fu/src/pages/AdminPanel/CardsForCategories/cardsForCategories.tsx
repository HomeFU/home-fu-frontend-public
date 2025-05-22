import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./carsForCategories.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllCardsForCategories } from "../../../api/Admin/CardsCategories/getAllCardsCategories";
import { DeleteCardsCategoryForAdmin } from "../../../api/Admin/CardsCategories/deleteCardsCategory";
import { AddNewCardForCategories } from "./AddNewCardForCategories/addNewCardForCategories";
import { UpdateCardForCategories } from "./UpdateCardForCategories/updateCardForCategories";
import { openAddCardForm } from "../../../redux/AdminPanel/adminCardAdd";
import { openUpdateCardForm } from "../../../redux/AdminPanel/adminCardUpdate";
import type { RootState } from '../../../redux/store';

type CategoriesCardsModel = {
  id: number;
  name: string;
  locationId: number;
  locationName: string;
  rating: number;
  price: number;
  isDeleted: boolean;
  imageUrls: string[];
  categoryIds: number;
};

export const CardsForCategories = () => {
  const dispatch = useDispatch();

  const isOpenAddCardForm = useSelector(
    (state: RootState) => state.cardFormAdd.isOpenAddCardForm
  );
  const isOpenUpdateCardForm = useSelector(
    (state: RootState) => state.cardFormUpdate.isOpenUpdateCardForm
  );

  const [responseData, setResponseData] = useState<CategoriesCardsModel[]>([]);

  const fetchData = async () => {
    try {
      const data = await AllCardsForCategories();
      setResponseData(data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  };

  const deleteCardsCategory = async (id: number) => {
    try {
      await DeleteCardsCategoryForAdmin(id);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const editCardFunction = () => {
    dispatch(openUpdateCardForm());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { label: "ID", renderCell: (item: CategoriesCardsModel) => item.id },
    { label: "Name", renderCell: (item: CategoriesCardsModel) => item.name },
    { label: "LocationName", renderCell: (item: CategoriesCardsModel) => item.locationName},
    { label: "Rating", renderCell: (item: CategoriesCardsModel) => item.rating },
    { label: "Price", renderCell: (item: CategoriesCardsModel) => item.price},
    {
      label: "Image",
      renderCell: (item: CategoriesCardsModel) => (
        <img
          src={`https://homefuserverback.azurewebsites.net${item.imageUrls[0]}`}
          alt={item.name}
          style={{
            objectFit: "cover",
            borderRadius: "6px",
            width: "40px",
            height: "40px"
          }}
        />
      ),
    },  
    {
      label: "Actions",
      renderCell: (item: CategoriesCardsModel) => (
        <div className={style.typesButtons}>
          <button onClick={editCardFunction} className={style.editBtn}>Edit</button>
          <button onClick={() => deleteCardsCategory(item.id)} className={style.deleteBtn}>Delete</button>
        </div>
      ), 
    },
  ];

  return (
    <>
      <div>
        <div className={style.header}>
          <h1>All Cards for Categories</h1>
          <button onClick={() => dispatch(openAddCardForm())}>+ Add Cards</button>
        </div>
        <div className={style.wrapperTable}>
          <CompactTable columns={columns} data={{ nodes: responseData }} />
        </div>
      </div>
      {isOpenAddCardForm && <AddNewCardForCategories />}
      {isOpenUpdateCardForm && <UpdateCardForCategories />}
    </>
  );
};