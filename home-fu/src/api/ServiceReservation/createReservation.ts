import { apiBaseURL } from "..";
import { ReservationData } from "../../types/ReservationTypes/reservationTypes";

export const CreateReservation = async (data: ReservationData, token: string) => {
    const response = await apiBaseURL.post('/reservation', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
}