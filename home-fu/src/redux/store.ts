import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/LoginRegisterFormSlice/formSlice";
import regionReducer from "../redux/TravelFilter/regionSlice";
import guestReducer from "./TravelFilter/GuestSlices/guestSlice";
import countersReducer from "./TravelFilter/GuestSlices/countersSlice";
import arrivalSlice from "./DateArrivalSlice/arrivalSlice";
import departureSlice from "./DateDepartureSlice/departureSlice";
import categorySlice from "./CategoryFilter/CategorySlice/categorySlice"

export const store = configureStore({
    reducer:{
        form: formReducer,
        region:regionReducer,
        guest: guestReducer,
        counters: countersReducer,
        arrival: arrivalSlice,
        departure: departureSlice,
        category:categorySlice
    }
})