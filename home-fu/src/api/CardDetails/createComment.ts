import { apiBaseURL } from ".."

export const CreateComment = async ({ id, text , value}: { id: string; text: string; value: number; }) => {
    const token = localStorage.getItem("token");
  
    const response = await apiBaseURL.post(
      `carddetails/${id}/reviews`,
      { text, value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };