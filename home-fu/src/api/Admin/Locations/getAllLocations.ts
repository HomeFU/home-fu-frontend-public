import { apiBaseURL } from "../..";

const URL_ALL_Locations_For_Admin = "locations";

export const AllLocationsForAdmin = async () => {
    const response = await apiBaseURL.get(URL_ALL_Locations_For_Admin);
    return response.data;
}