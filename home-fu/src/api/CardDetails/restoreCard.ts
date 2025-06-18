import { apiBaseURL } from "..";

export const RestoreCard = async (id:number) => {
    const response = await apiBaseURL.patch(`carddetails/${id}/restore`);
    return response.data;
}