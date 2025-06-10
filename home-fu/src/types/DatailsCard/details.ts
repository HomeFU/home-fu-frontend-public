type Amenities = {
  id: number,
  name: string,
  imageUrl: string,
}

export type CardDetailsModel = {
    id: number;
    numberOfGuests: number;
    numberOfBedrooms: number;
    numberOfBeds: number;
    numberOfBathrooms: number;
    hostId: string;
    hostName: string;
    hostAvatarUrl: string;
    description: string;
    latitude: number;
    longitude: number;
    amenities: Amenities[];
    ratings: {
      cleanliness: number;
      accuracy: number;
      checkIn: number;
      communication: number;
      location: number;
      value: number;
    };
    card: {
      id: number;
      name: string;
      locationId: number;
      locationName: string;
      startDate: string;
      endDate: string;
      rating: number;
      price: number;
      isDeleted: boolean;
      imageUrls: string[];
      categoryIds: string[];
    };
  }
  