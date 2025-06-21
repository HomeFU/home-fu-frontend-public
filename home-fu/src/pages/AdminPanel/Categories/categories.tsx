import { useState } from "react";
import style from "./categories.module.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { AllCategoriesForAdmin } from "../../../api/Admin/Categories/getAllCategories";
import { DeleteCategoryForAdmin } from "../../../api/Admin/Categories/deleteCategory";
import { AddNewCategory } from "./AddNewCategoryForm/addNewCategoryForm";
import { UpdateCategory } from "./UpdateCategoriesForm/updateCategoriesForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "..//..//..//redux/store"; 
import { toggleAddCategoryForm } from "..//..//..//redux/AdminPanel/adminCategoryAdd";
import { openEditCategoryForm, closeEditCategoryForm } from "..//..//..//redux/AdminPanel/adminCategoryEdit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type CategoriesModel = {
  id: number;
  name: string;
  imageUrl: string;
};

export const Categories = () => {
  const dispatch = useDispatch();
  const isOpenFormAddCategory = useSelector((state: RootState) => state.categoryPanel.isOpenAddCategoryForm);
  const isOpenFormUpdateCategory = useSelector((state: RootState) => state.categoryPanelEdit.isOpenEditCategoryForm);
  const [idForUpdateCategory, setIdForUpdateCategory] = useState<number | null >(null);
  const [nameForUpdateCategory, setNameForUpdateCategory] = useState<string>('');

  const queryClient = useQueryClient();

  const editCategoryFunction = (id: number, name: string) => {
    dispatch(openEditCategoryForm());
    setNameForUpdateCategory(name);
    setIdForUpdateCategory(id);
  };

  const closeAddForm = () => {
    dispatch(toggleAddCategoryForm());
  };

  const closeUpdateForm = () => {
    dispatch(closeEditCategoryForm());
  };

  const {
    data: fullDataInfoCategories,
  } = useQuery<CategoriesModel[]>({
    queryKey:['category', 'full'],
    queryFn: () => AllCategoriesForAdmin()
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id:number) => DeleteCategoryForAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category', 'full'] });
      alert("Категорію видалено!");
    },
    onError: (error) => {
    console.error("Помилка при видаленні категорії:", error);
    alert("Не вдалося видалити категорію");
  },
  })

  const deleteCategory = (id: number) => {
    deleteCategoryMutation.mutate(id);
  };

  const toggleForm = () => {
    dispatch(toggleAddCategoryForm());
  };

  const columns = [
    { label: "ID", renderCell: (item: CategoriesModel) => item.id },
    { label: "Name", renderCell: (item: CategoriesModel) => item.name },
    {
      label: "Image",
      renderCell: (item: CategoriesModel) => (
        <img
          src={`https://homefu.azurewebsites.net${item.imageUrl}`}
          alt={item.name}
          width={50}
          height={50}
          style={{ 
            objectFit: "cover",
            borderRadius: "6px",
            width: "40px",
            height: "40px"
          }}
          loading="lazy"
        />
      ),
    },  
    {
      label: "Actions",
      renderCell: (item: CategoriesModel) => (
        <div className={style.typesButtons}>
          <button 
            onClick={() => editCategoryFunction(item.id, item.name)} 
            className={style.editBtn}
          >
            Edit
          </button>
          <button 
            onClick={() => deleteCategory(item.id)} 
            className={style.deleteBtn}
          >
            Delete
          </button>
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
          <CompactTable columns={columns} data={{ nodes: fullDataInfoCategories || [] }} />
        </div>
      </div>
      {isOpenFormAddCategory && <AddNewCategory onClose={closeAddForm} />}
      {isOpenFormUpdateCategory && (
        <UpdateCategory 
          id={idForUpdateCategory} 
          imageUrl="" 
          name={nameForUpdateCategory} 
          onClose={closeUpdateForm}
        />
      )}
    </>
  );
};