import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const menuSlice = createSlice({
    name:"mobileMenu",
    initialState,
    reducers:{
        openCloseMobileMenu: (state) => {
            state.isOpen = !state.isOpen
        }
    }
});

export const { openCloseMobileMenu } = menuSlice.actions;
export default menuSlice.reducer;