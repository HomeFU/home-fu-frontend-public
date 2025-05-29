import { CategoryType } from "../../../types/Categories/addNewCategory";
import { apiBaseURL } from "../..";

const URL_AddNewCategory = "categories";

export const AddNewCategoryAPI = async (data: CategoryType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("imageFile", data.imageFile);

    const response = await apiBaseURL.post(URL_AddNewCategory, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

