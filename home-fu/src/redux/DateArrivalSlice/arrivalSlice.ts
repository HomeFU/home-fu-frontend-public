import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type dateState = {
  selectedDate: Date | null
  isOpen: boolean
}

const initialState: dateState = {
  selectedDate: null,
  isOpen: false
}

const arrivalSlice = createSlice({
  name: 'arrival',
  initialState,
  reducers: {
    setSelectedArrivalDate: (state, action: PayloadAction<Date | null>) => {
      state.selectedDate = action.payload
    },
    toggleDateArrival: (state) => {
      state.isOpen = !state.isOpen
    },
    closeDateArrival: (state) => {
      state.isOpen = false
    }
  },
  
})

export const { setSelectedArrivalDate, toggleDateArrival, closeDateArrival } = arrivalSlice.actions
export default arrivalSlice.reducer
