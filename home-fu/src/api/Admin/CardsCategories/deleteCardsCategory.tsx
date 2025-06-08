import { apiBaseURL } from "../..";

const URL_Delete_CardsCategory = "cards/";

export const DeleteCardsCategoryForAdmin = async (id: number) => {
    const response = await apiBaseURL.delete(URL_Delete_CardsCategory + `${id}`);
    return response.data;
}