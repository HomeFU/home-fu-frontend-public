import { apiBaseURL } from "../..";

const URL_Delete_Category = "categories/";

export const DeleteCategoryForAdmin = async (id: number) => {
   const response =  await apiBaseURL.delete(URL_Delete_Category + `${id}`);
   return response.data;
}