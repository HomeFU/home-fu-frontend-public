import axios from "axios";
import { UpdateCategoryType } from "../../../types/Categories/updateCategory";

const URL_UpdateCategory = "https://homefuserverback.azurewebsites.net/api/categories/";

export const UpdateCategoryAPI = async ({
  data,
  id,
}: {
  data: UpdateCategoryType;
  id: number;
}) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('imageFile', data.imageFile);

  const response = await axios.put(
    `${ URL_UpdateCategory}${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

