import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/LoginRegisterFormSlice/formSlice";
import regionReducer from "../redux/TravelFilter/regionSlice";
import guestReducer from "./TravelFilter/GuestSlices/guestSlice";
import countersReducer from "./TravelFilter/GuestSlices/countersSlice";

export const store = configureStore({
    reducer:{
        form: formReducer,
        region:regionReducer,
        guest: guestReducer,
        counters: countersReducer
    }
})