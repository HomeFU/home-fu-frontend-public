import { apiBaseURL } from "..";

const URl_Locations = "locations";

export const Locations = async () => {
    const response = await apiBaseURL.get(URl_Locations);
    return response.data;
}