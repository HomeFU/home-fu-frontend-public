import { apiBaseURL } from ".."
import { CommentsModel } from "../../types/Comments/comments";

export const CreateComment = async ({ id, text , value, cleanliness, accuracy, checkIn, communication, location}: CommentsModel) => {
    const token = localStorage.getItem("token");
  
    const response = await apiBaseURL.post(
      `carddetails/${id}/reviews`,
      { text, value, cleanliness , accuracy, checkIn, communication, location},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };