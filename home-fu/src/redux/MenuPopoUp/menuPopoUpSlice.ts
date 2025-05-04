import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen:false
};

const menuPopUpSlice = createSlice({
    name:"menuPopUp",
    initialState,
    reducers: {
        toggleMenuPopUp:(state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const {toggleMenuPopUp} = menuPopUpSlice.actions;
export default menuPopUpSlice.reducer;