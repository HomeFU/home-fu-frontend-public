import { UpdateLocationType } from "../../../types/Locations/updateLocation";
import { apiBaseURL } from "../..";

const URL_UpdateLocation = "locations/";

export const UpdateLocationAPI = async ({
  data,
  id,
}: {
  data: UpdateLocationType;
  id: number;
}) => {
  const response = await apiBaseURL.put(`${URL_UpdateLocation}${id}`, data);
  return response.data;
};
