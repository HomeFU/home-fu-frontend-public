import axios from "axios";

const URL_ALL_Locations_For_Admin = "https://homefuserverback.azurewebsites.net/api/locations";

export const AllLocationsForAdmin = async () => {
    const response = await axios.get(URL_ALL_Locations_For_Admin);
    return response.data;
}