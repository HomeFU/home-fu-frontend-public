import { apiBaseURL } from "../api"

export const AmenitiesApi = async () => {
    const response = await apiBaseURL.get('amenities');
    return response.data;
}