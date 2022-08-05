import { configureStore } from "@reduxjs/toolkit";
import CarouselReducer from "./reducers/CarouselReducer";
import ModalTrailerReducer from "./reducers/ModalTrailerReducer";
import MovieReducer from "./reducers/MovieReducer";
import TheaterReducer from "./reducers/TheaterReducer";
import MovieDetailReducer from "./reducers/MovieDetailReducer";
import AuthReducer from "./reducers/AuthReducer";
import UsersManagementReducer from "./reducers/UsersManagementReducer";
import BookingTicketReducer from "./reducers/BookingTicketReducer";
import LazyReducer from "./reducers/LazyReducer";

const store = configureStore({
  reducer: {
    CarouselReducer,
    ModalTrailerReducer,
    MovieReducer,
    TheaterReducer,
    MovieDetailReducer,
    AuthReducer,
    UsersManagementReducer,
    BookingTicketReducer,
    LazyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
