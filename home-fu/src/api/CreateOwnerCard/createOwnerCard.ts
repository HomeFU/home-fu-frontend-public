import { apiBaseURL } from ".."

export const CreateOwnerCards = async (formData: FormData) => {
  const response = await apiBaseURL.post('carddetails', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}