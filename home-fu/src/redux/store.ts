import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/LoginRegisterFormSlice/formSlice";
import regionReducer from "../redux/TravelFilter/regionSlice";
import guestReducer from "./TravelFilter/GuestSlices/guestSlice";
import countersReducer from "./TravelFilter/GuestSlices/countersSlice";
import arrivalSlice from "./DateArrivalSlice/arrivalSlice";
import departureSlice from "./DateDepartureSlice/departureSlice";
import categorySlice from "./CategoryFilter/CategorySlice/categorySlice"
import filterMenuSlice from "./Filtermenu/filtermenu"
import authSlice from "./Auth/authSlice";
import menuSlice from "./MobileMenu/menuSlice";
export const store = configureStore({
    reducer:{
        form: formReducer,
        region:regionReducer,
        guest: guestReducer,
        counters: countersReducer,
        arrival: arrivalSlice,
        departure: departureSlice,
        category:categorySlice,
        filterMenu: filterMenuSlice,
        auth: authSlice,
        mobileMenu: menuSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch