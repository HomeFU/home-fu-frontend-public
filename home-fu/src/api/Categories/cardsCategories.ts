import axios from "axios";

const URL_Categories = "https://homefuserverback.azurewebsites.net/api/cards/byCategory?categoryIds";

export const CardsCategories = async (id:number) => {
    const response = await axios.get(URL_Categories + `=${id}`);
    return response.data;
}