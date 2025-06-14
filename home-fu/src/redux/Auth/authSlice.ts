import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: localStorage.getItem("isAuthenticatedUser") === "true",
    user: JSON.parse(localStorage.getItem("user") || "null"),
  };
  

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticatedUser", "true");
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("isAuthenticatedUser");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("isAdminUser");
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;