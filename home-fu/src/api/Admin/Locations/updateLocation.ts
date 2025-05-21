import axios from "axios";
import { UpdateLocationType } from "../../../types/Locations/updateLocation";

const URL_UpdateLocation = "https://homefuserverback.azurewebsites.net/api/locations/";

export const UpdateLocationAPI = async ({
  data,
  id,
}: {
  data: UpdateLocationType;
  id: number;
}) => {
  const response = await axios.put(`${URL_UpdateLocation}${id}`, data);
  return response.data;
};
