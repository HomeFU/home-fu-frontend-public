import axios from "axios";

const URl_Locations = "https://homefuserverback.azurewebsites.net/api/locations";

export const Locations = async () => {
    const response = await axios.get(URl_Locations);
    return response.data;
}