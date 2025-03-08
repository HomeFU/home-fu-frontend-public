import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/LoginRegisterFormSlice/formSlice";

export const store = configureStore({
    reducer:{
        form: formReducer
    }
})