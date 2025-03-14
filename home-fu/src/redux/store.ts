import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/LoginRegisterFormSlice/formSlice";
import regionReducer from "../redux/TravelFilter/regionSlice";

export const store = configureStore({
    reducer:{
        form: formReducer,
        region:regionReducer
    }
})