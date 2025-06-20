import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/LoginRegisterFormSlice/formSlice";
import regionReducer from "./TravelFilter/GuestSlices/regionSlice";
import guestReducer from "./TravelFilter/GuestSlices/guestSlice";
import countersReducer from "./TravelFilter/GuestSlices/countersSlice";
import arrivalSlice from "./DateArrivalSlice/arrivalSlice";
import departureSlice from "./DateDepartureSlice/departureSlice";
import categorySlice from "./CategoryFilter/CategorySlice/categorySlice"
import filterMenuSlice from "./Filtermenu/filtermenu"
import authSlice from "./Auth/authSlice";
import menuSlice from "./MobileMenu/menuSlice";
import animalsModalState from "./TravelFilter/GuestSlices/animalsSlice";
import scrolledFilter from "./TravelFilter/ScrollUpdateFilterSlice/filterUpdateScroll";
import menuPopUpSlice from "./MenuPopoUp/menuPopoUpSlice";
import adminPanelAddLocationReducer from "../redux/AdminPanel/adminPanel";
import adminupdateLocationFormReducer from "../redux/AdminPanel/editPanelFirst";
import adminCategoryAddReducer from "./AdminPanel/adminCategoryAdd";
import adminCategoryEditReducer from "./AdminPanel/adminCategoryEdit";
import cardFormAddReducer from "../redux/AdminPanel/adminCardAdd";
import cardFormUpdateReducer from "../redux/AdminPanel/adminCardUpdate";
import filtersReducer from "./CardsCategoryFilter/filterSlice";
import reservationReducer from '..//redux/ReservationSlice/reservationSlice'; 

export const store = configureStore({
    reducer:{
        form: formReducer,
        region:regionReducer,
        guest: guestReducer,
        counters: countersReducer,
        arrival: arrivalSlice,
        departure: departureSlice,
        category:categorySlice,
        filterMenu: filterMenuSlice,
        auth: authSlice,
        mobileMenu: menuSlice,
        animalsModal: animalsModalState,
        scrolledFilter: scrolledFilter,
        menuPopUp: menuPopUpSlice,
        adminPanelAddLocation: adminPanelAddLocationReducer,
        adminupdateLocationForm: adminupdateLocationFormReducer,
        categoryPanel: adminCategoryAddReducer,
        categoryPanelEdit: adminCategoryEditReducer,
        cardFormAdd: cardFormAddReducer,
        cardFormUpdate : cardFormUpdateReducer,
        filters: filtersReducer,
        reservation: reservationReducer,
       
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch