import { apiBaseURL } from "../..";

const URL_Delete_Location = "locations/";

export const DeleteLocationForAdmin = async (id: number) => {
   const response = await apiBaseURL.delete(URL_Delete_Location + `${id}`);
   return response.data;
}