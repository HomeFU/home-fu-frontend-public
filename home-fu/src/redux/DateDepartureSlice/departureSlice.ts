import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type dateState = {
  selectedDate: Date | null,
  isOpen: boolean
}

const initialState: dateState = {
  selectedDate: null,
  isOpen:false
}

const departureSlice = createSlice({
  name: 'departure',
  initialState,
  reducers: {
    setSelectedDepartureDate: (state, action: PayloadAction<Date | null>) => {
      state.selectedDate = action.payload
    },
    toggleDateDeparture: (state) => {
      state.isOpen = !state.isOpen
    },
    closeDateDeparture: (state) => {
      state.isOpen = false
    }
  },
  
})

export const { setSelectedDepartureDate, toggleDateDeparture, closeDateDeparture } = departureSlice.actions
export default departureSlice.reducer
