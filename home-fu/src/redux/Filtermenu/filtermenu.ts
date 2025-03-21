import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type RoomType = "bedrooms" | "beds" | "bathrooms"
type PlaceType = "any" | "room" | "entire"

interface PriceRange {
  min: number
  max: number
}

interface Rooms {
  bedrooms: number
  beds: number
  bathrooms: number
}

interface FilterState {
  isOpen: boolean
  isAnimating: boolean // Add this to track animation state
  filters: {
    placeType: PlaceType
    priceRange: PriceRange
    rooms: Rooms
  }
}

const initialState: FilterState = {
  isOpen: false,
  isAnimating: false,
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

const filterMenuSlice = createSlice({
  name: "filterMenu",
  initialState,
  reducers: {
    toggleForm: (state) => {
      // Only toggle if not currently animating
      if (!state.isAnimating) {
        state.isOpen = !state.isOpen
      }
    },
    startClosingAnimation: (state) => {
      state.isAnimating = true
    },
    closeFilterMenu: (state) => {
      state.isOpen = false
      state.isAnimating = false
    },
    setPlaceType: (state, action: PayloadAction<PlaceType>) => {
      state.filters.placeType = action.payload
    },
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.filters.priceRange = action.payload
    },
    incrementRoom: (state, action: PayloadAction<RoomType>) => {
      const roomType = action.payload
      state.filters.rooms[roomType] += 1
    },
    decrementRoom: (state, action: PayloadAction<RoomType>) => {
      const roomType = action.payload
      if (state.filters.rooms[roomType] > 0) {
        state.filters.rooms[roomType] -= 1
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const {
  toggleForm,
  startClosingAnimation,
  closeFilterMenu,
  setPlaceType,
  setPriceRange,
  incrementRoom,
  decrementRoom,
  resetFilters,
} = filterMenuSlice.actions

export default filterMenuSlice.reducer

