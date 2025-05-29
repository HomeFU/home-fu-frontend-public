import { apiBaseURL } from "../..";

const URL_Delete_CardsCategory = "cards/";

export const DeleteCardsCategoryForAdmin = async (id: number) => {
    await apiBaseURL.delete(URL_Delete_CardsCategory + `${id}`);
}