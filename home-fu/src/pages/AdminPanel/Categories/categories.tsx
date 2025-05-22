import { useEffect, useState } from "react";
import style from "./categories.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllCategoriesForAdmin } from "../../../api/Admin/Categories/getAllCategories";
import { DeleteCategoryForAdmin } from "../../../api/Admin/Categories/deleteCategory";
import { AddNewCategory } from "./AddNewCategoryForm/addNewCategoryForm";
import { UpdateCategory } from "./UpdateCategoriesForm/updateCategoriesForm";
// import { AddNewCategoryForm } from "./AddNewCategoryForm/addNewCategoryForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "..//..//..//redux/store"; 
import { toggleAddCategoryForm } from "..//..//..//redux/AdminPanel/adminCategoryAdd";

type CategoriesModel = {
  id: number;
  name: string;
  imageUrl: string;
};

export const Categories = () => {
  const dispatch = useDispatch();
  const isOpenFormAddCategory = useSelector((state: RootState) => state.categoryPanel.isOpenAddCategoryForm);
  const [isOpenFormUpdateCategory, setOpenFormUpdateCategory] = useState(false);

  const [idForUpdateCategory, setIdForUpdateCategory] = useState<number>(null);
  const [nameForUpdateCategory, setNameForUpdateCategory] = useState<string>('');

  const [responseData, setResponseData] = useState<CategoriesModel[]>([]);

  const editCategotyFunction = (id:number, name:string) => {
    setOpenFormUpdateCategory((prev) => !prev);
    setNameForUpdateCategory(name);
    setIdForUpdateCategory(id);
  }
const closeAddForm = () => {
  dispatch(toggleAddCategoryForm());
  fetchData(); 
};

  const fetchData = async () => {
    try {
      const data = await AllCategoriesForAdmin();
      setResponseData(data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  };

  const deleteCategory = async (id:number) => {
    try {
        DeleteCategoryForAdmin(id);
    } catch (error) {
        console.error("Error dele category", error);
    } 
  }

const toggleForm = () => {
    dispatch(toggleAddCategoryForm());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { label: "ID", renderCell: (item: any) => item.id },
    { label: "Name", renderCell: (item: any) => item.name },
    {
        label: "Image",
        renderCell: (item: CategoriesModel) => (
          <img
            src={`https://homefuserverback.azurewebsites.net${item.imageUrl}`}
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
          <button onClick={() => {editCategotyFunction(item.id, item.name)}} className={style.editBtn}>Edit</button>
          <button onClick={() => {deleteCategory(item.id)}} className={style.deleteBtn}>Delete</button>
        </div>
      ),
    },
  ];

return (
    <>
      <div>
        <div className={style.header}>
          <h1>All Categories</h1>
          <button onClick={toggleForm}>+ Add Category</button>
        </div>
        <div className={style.wrapperTable}>
          <CompactTable columns={columns} data={{ nodes: responseData }} />
        </div>
      </div>
      {isOpenFormAddCategory && <AddNewCategory onClose={closeAddForm} />}
      {isOpenFormUpdateCategory && <UpdateCategory id={idForUpdateCategory} imageUrl="" name={nameForUpdateCategory} />}
    </>
  );
};