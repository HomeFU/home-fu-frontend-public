import { UserModel } from "../types/Auth/auth";
import { GetFullInfoAboutUser } from "../api/Profile/userData";
import { useQuery } from '@tanstack/react-query';

export const useFullInfoUser = (token:string) => {
   return useQuery<UserModel>({
        queryKey: ['fullInfoUserData', token],
        queryFn: () => GetFullInfoAboutUser(token),
    });
}