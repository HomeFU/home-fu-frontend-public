import axios from "axios";
import { AddNewCategoryModel } from "../../../types/Categories/addNewCategory";

const URL_Add_New_Category = "https://homefuserverback.azurewebsites.net/api/categories";

export const AddNewCategoriesForAdmin = async (data:AddNewCategoryModel) => {
    const response = await axios.post(URL_Add_New_Category, data);
    return response.data;
}