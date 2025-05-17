import axios from "axios";

const URL_ALL_Cards_For_Categories = " https://homefuserverback.azurewebsites.net/api/cards";

export const AllCardsForCategories = async () => {
    const response = await axios.get(URL_ALL_Cards_For_Categories);
    return response.data;
}