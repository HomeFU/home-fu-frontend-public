import { UpdateCategoryType } from "../../../types/Categories/updateCategory";
import { apiBaseURL } from "../..";

const URL_UpdateCategory = "categories/";

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

  const response = await apiBaseURL.put(
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

