import {createSlice} from "@reduxjs/toolkit";

type selectedCategoriState = {
    isSelectedCategori:string
}

const initialState:selectedCategoriState = {
    isSelectedCategori: "Гарні краєвиди"
}

export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers: {
        setSelectedCategori: (state, action: {payload: string}) => {
            state.isSelectedCategori = action.payload
        }
    }
});

export const { setSelectedCategori } = categorySlice.actions;
export default categorySlice.reducer;