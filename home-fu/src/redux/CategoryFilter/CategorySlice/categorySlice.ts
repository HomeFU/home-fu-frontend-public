import {createSlice} from "@reduxjs/toolkit";

type selectedCategoriState = {
    isSelectedCategori:number
}

const initialState:selectedCategoriState = {
    isSelectedCategori: 1
}

export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers: {
        setSelectedCategori: (state, action: {payload: number}) => {
            state.isSelectedCategori = action.payload
        }
    }
});

export const { setSelectedCategori } = categorySlice.actions;
export default categorySlice.reducer;