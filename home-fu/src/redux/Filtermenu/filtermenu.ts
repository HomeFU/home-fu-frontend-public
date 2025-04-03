import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

type RoomType = "bedrooms" | "beds" | "bathrooms"

interface FilterMenuState {
  isOpen: boolean
  isAnimating: boolean
  resetTriggered: boolean
  filters: {
    placeType: "any" | "room" | "entire"
    priceRange: {
      min: number
      max: number
    }
    rooms: {
      bedrooms: number
      beds: number
      bathrooms: number
    }
  }
}

const initialState: FilterMenuState = {
  isOpen: false,
  isAnimating: false,
  resetTriggered: false,
  filters: {
    placeType: "any",
    priceRange: {
      min: 0,
      max: 14000,
    },
    rooms: {
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },
  },
}

export const filterMenuSlice = createSlice({
  name: "filterMenu",
  initialState,
  reducers: {
    openFilterMenu: (state) => {
      state.isOpen = true
      state.isAnimating = false
    },
    closeFilterMenu: (state) => {
      state.isOpen = false
      state.isAnimating = false
    },
    toggleForm: (state) => {
      state.isOpen = !state.isOpen
      state.isAnimating = false
    },
    startClosingAnimation: (state) => {
      state.isAnimating = true
    },
    setPlaceType: (state, action: PayloadAction<"any" | "room" | "entire">) => {
      state.filters.placeType = action.payload
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filters.priceRange = action.payload
    },
    incrementRoom: (state, action: PayloadAction<RoomType>) => {
      if (state.filters.rooms[action.payload] < 8) {
        state.filters.rooms[action.payload] += 1
      }
    },
    decrementRoom: (state, action: PayloadAction<RoomType>) => {
      if (state.filters.rooms[action.payload] > 0) {
        state.filters.rooms[action.payload] -= 1
      }
    },
    setRoomValue: (state, action: PayloadAction<{ type: RoomType; value: number }>) => {
      state.filters.rooms[action.payload.type] = action.payload.value
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
      state.resetTriggered = !state.resetTriggered
    },
  },
})

export const {
  openFilterMenu,
  closeFilterMenu,
  toggleForm,
  startClosingAnimation,
  setPlaceType,
  setPriceRange,
  incrementRoom,
  decrementRoom,
  setRoomValue,
  resetFilters,
} = filterMenuSlice.actions

export default filterMenuSlice.reducer