import { apiBaseURL } from ".."

export const Amenities = async () => {
    const response = await apiBaseURL.get('amenities');
    return response.data;
}