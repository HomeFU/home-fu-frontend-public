type Amenities = {
  id: number,
  name: string,
  imageUrl: string,
}

type Reviews = {
  id: number
  text: string
  createdAt: string
  userName: string,
  userProfileImageUrl: string,
  overallRating: number
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
    reviews: Reviews[];
  }
  