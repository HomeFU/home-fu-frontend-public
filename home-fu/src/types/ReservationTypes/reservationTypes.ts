export type ReservationData = {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children?: number;
  infants?: number;
  pets?: number;
  cardId: number;
};