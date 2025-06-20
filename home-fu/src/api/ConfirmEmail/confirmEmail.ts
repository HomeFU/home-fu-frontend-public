import { apiBaseURL } from "../index";

export const ConfirmEmailService = {
  confirmEmail: async (email: string, confirmCode: string) => {
    const response = await apiBaseURL.post("/auth/confirm-email", {
      email,
      confirmCode,
    });
    return response.data;
  },
};
