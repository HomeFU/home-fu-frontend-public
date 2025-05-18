import axios from "axios";
import { CategoryType } from "../../../types/Categories/addNewCategory";

const URL_AddNewCategory = "https://homefuserverback.azurewebsites.net/api/categories";

export const AddNewCategoryAPI = async (data: CategoryType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("imageFile", data.imageFile);

    const response = await axios.post(URL_AddNewCategory, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

