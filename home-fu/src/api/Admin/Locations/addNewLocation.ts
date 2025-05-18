import axios from "axios";
import { LocationType } from "../../../types/Locations/addNewLocation";

const URL_AddNewLocation = "https://homefuserverback.azurewebsites.net/api/locations";

export const AddNewLocationAPI = async (data:LocationType) => {
    const response = await axios.post(URL_AddNewLocation, data);
    return response;
}
