import { LocationType } from "../../../types/Locations/addNewLocation";
import { apiBaseURL } from "../..";

const URL_AddNewLocation = "locations";

export const AddNewLocationAPI = async (data:LocationType) => {
    const response = await apiBaseURL.post(URL_AddNewLocation, data);
    return response;
}
