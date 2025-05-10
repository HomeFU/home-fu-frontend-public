import axios from "axios";

const URL_Categories = "https://homefuserverback.azurewebsites.net/api/categories";

export const Categories = async () => {
    const response = await axios.get(URL_Categories );
    return response.data;
}