import { useEffect, useState } from "react";
import style from "./categories.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllCategoriesForAdmin } from "../../../api/Admin/Categories/getAllCategories";
import { DeleteCategoryForAdmin } from "../../../api/Admin/Categories/deleteCategory";
// import { AddNewCategoryForm } from "./AddNewCategoryForm/addNewCategoryForm";

type CategoriesModel = {
  id: number;
  name: string;
  umgUrl: string;
  cardCategories: number;
};

export const Categories = () => {
  const [isOpenFormAddCategory, setOpenFormAddCategory] = useState(false);

  const [responseData, setResponseData] = useState<CategoriesModel[]>([]);

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
        console.log("deleted");
    } catch (error) {
        console.error("Error dele category", error);
    } 
  }

  const toggleFormFormAddCategory = () => {
    setOpenFormAddCategory((prev) => !prev);
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
    { label: "Cards", renderCell: (item: any) => item.cardCategories },
    {
      label: "Types",
      renderCell: (item: any) => (
        <div className={style.typesButtons}>
          <button onClick={() => {console.log("Edit")}} className={style.editBtn}>Edit</button>
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
        <button onClick={toggleFormFormAddCategory}>+ Add Category</button>
      </div>
      <div className={style.wrapperTable}>
        <CompactTable columns={columns} data={{ nodes: responseData }} />
      </div>
    </div>
    {/* {isOpenFormAddCategory && <AddNewCategoryForm/>} */}
    </>
  );
};
