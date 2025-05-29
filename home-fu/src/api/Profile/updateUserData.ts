import { UserModel } from "../../types/Profile/fullUsedData";
import { apiBaseURL } from "..";

const URl_UpdateInfoAboutUser = "users/";

export const UpdateInfoAboutUser = ({ token, id, data }: { token: string, id: number, data: UserModel }) => {
    return apiBaseURL.patch(`${URl_UpdateInfoAboutUser}${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
};
  