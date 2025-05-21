import axios from "axios";

const URL_Delete_CardsCategory = "https://homefuserverback.azurewebsites.net/api/cards/";

export const DeleteCardsCategoryForAdmin = async (id: number) => {
    await axios.delete(URL_Delete_CardsCategory + `${id}`);
}