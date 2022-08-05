import bookingAPI from "../../services/bookingAPI";
import * as actionTypes from "../constants/BookingTicketConstant";

export const getCinemaInfo = (showtimeID) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_CINEMA_INFO_REQUEST });
    try {
      const data = await bookingAPI.getCinemaInfo(showtimeID);
      dispatch({ type: actionTypes.GET_CINEMA_INFO_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.GET_CINEMA_INFO_FAIL, error });
    }
  };
};

export const bookTicket = (value) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.BOOK_TICKET_REQUEST });
    try {
      const data = await bookingAPI.bookTicket(value);
      dispatch({ type: actionTypes.BOOK_TICKET_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.BOOK_TICKET_FAIL, error });
    }
  };
};

export const createShowtime = (value) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_SHOWTIME_REQUEST });
    try {
      const data = await bookingAPI.createShowtime(value);
      dispatch({ type: actionTypes.CREATE_SHOWTIME_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_SHOWTIME_FAIL, error });
    }
  };
};

export const resetCreateShowtime = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_CREATE_SHOWTIME,
    });
  };
};
