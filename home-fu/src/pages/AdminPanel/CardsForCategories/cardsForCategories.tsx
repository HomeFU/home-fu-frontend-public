import { useEffect, useState } from "react";
import style from "./carsForCategories.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllCardsForCategories } from "../../../api/Admin/CardsCategories/getAllCardsCategories";
import { DeleteCardsCategoryForAdmin } from "../../../api/Admin/CardsCategories/deleteCardsCategory";
import { AddNewCardForCategories } from "./AddNewCardForCategories/addNewCardForCategories";
import { UpdateCardForCategories } from "./UpdateCardForCategories/updateCardForCategories";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { openAddCardForm } from "../../../redux/AdminPanel/adminCardAdd";
import { openUpdateCardForm } from "../../../redux/AdminPanel/adminCardUpdate";

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
  const [responseData, setResponseData] = useState<CategoriesCardsModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardForUpdate, setCardForUpdate] = useState<CategoriesCardsModel | null>(null);
  const isAddCardFormOpen = useSelector((state: RootState) => state.cardFormAdd.isOpenAddCardForm);
  const isUpdateCardFormOpen = useSelector((state: RootState) => state.cardFormUpdate.isOpenUpdateCardForm);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await AllCardsForCategories();
      setResponseData(data);
    } catch (error) {
      console.error("Error loading categories", error);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCardsCategory = async (id: number) => {
    try {
      await DeleteCardsCategoryForAdmin(id);
      await fetchData();
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete item");
    }
  };

  const handleOpenUpdateForm = (card: CategoriesCardsModel) => {
    setCardForUpdate(card);
    dispatch(openUpdateCardForm());
  };

 /* useEffect(() => {
    fetchData();
  }, []);
Оригинал , ниже проверка.
*/

useEffect(() => {
  setResponseData([
    {
      id: 1,
      name: "Test Card",
      locationId: 1,
      locationName: "Test Location",
      rating: 5,
      price: 100,
      isDeleted: false,
      imageUrls: ["/test.png"],
      categoryIds: 1,
    }
  ]);
}, []);
  const columns = [
    { label: "ID", renderCell: (item: CategoriesCardsModel) => item.id },
    { label: "Name", renderCell: (item: CategoriesCardsModel) => item.name },
    { label: "Location", renderCell: (item: CategoriesCardsModel) => item.locationName },
    { label: "Rating", renderCell: (item: CategoriesCardsModel) => item.rating },
    { label: "Price", renderCell: (item: CategoriesCardsModel) => item.price },
    {
      label: "Image",
      renderCell: (item: CategoriesCardsModel) => (
        item.imageUrls?.length > 0 ? (
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
        ) : (
          <div style={{ width: 40, height: 40, backgroundColor: '#eee' }} />
        )
      ),
    },
    {
      label: "Actions",
      renderCell: (item: CategoriesCardsModel) => (
        <div className={style.typesButtons}>
          <button
            className={style.editBtn}
            onClick={() => handleOpenUpdateForm(item)}
          >
            Edit
          </button>
          <button
            onClick={() => deleteCardsCategory(item.id)}
            className={style.deleteBtn}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (error) return <div className={style.error}>Error: {error}</div>;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>All Cards for Categories</h1>
        <button
          className={style.button_add_card}
          onClick={() => dispatch(openAddCardForm())}
          disabled={isLoading}
        >
          + Add Cards
        </button>
      </div>

      <div className={style.wrapperTable}>
        <CompactTable
          columns={columns}
          data={{ nodes: responseData }}
        />
      </div>
      
      {isAddCardFormOpen && <AddNewCardForCategories/>}
      {isUpdateCardFormOpen && cardForUpdate && (
        <UpdateCardForCategories 
        />
      )}
    </div>
  );
};