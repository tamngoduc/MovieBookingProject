import { data } from "autoprefixer";
import * as actionTypes from "../constants/BookingTicketConstant";

const initialState = {
  cinemaInfo: {},
  cinemaInfoLoading: false,
  cinemaInfoError: null,

  // select seat
  seatList: [],
  isSelectedSeat: false,
  selectedSeatList: [],
  ticketList: [],
  amount: 0,

  timeOut: false,
  refreshKey: Date.now(),

  showtimeID: null,
  userAccount: null,

  // payment
  email: "",
  phone: "",
  paymentMethod: "",
  isReadyPayment: false,
  activeStep: 0,

  // booking ticket
  bookingTicketLoading: false,
  successBookingTicketMessage: null,
  errorBookingTicketMessage: null,

  createShowtimeLoading: false,
  successCreateShowtime: null,
  errorCreateShowtime: null,
};

const BookingTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CINEMA_INFO_REQUEST:
      return { ...state, cinemaInfoLoading: true, cinemaInfoError: null };

    case actionTypes.GET_CINEMA_INFO_SUCCESS:
      return {
        ...state,
        cinemaInfoLoading: false,
        cinemaInfo: action.data,
      };

    case actionTypes.GET_CINEMA_INFO_FAIL:
      return {
        ...state,
        cinemaInfoLoading: false,
        cinemaInfocinemaInfoErrorError: data.error,
      };

    case actionTypes.INIT_DATA: {
      return {
        ...state,
        seatList: action.data.seatList,
        showtimeID: action.data.showtimeID,
        userAccount: action.data.userAccount,
        email: action.data.email,
        phone: action.data.phone,
      };
    }

    // selecting seat
    case actionTypes.CHANGE_SEATLIST: {
      return {
        ...state,
        seatList: action.data.seatList,
        isSelectedSeat: action.data.isSelectedSeat,
        selectedSeatList: action.data.selectedSeatList,
        ticketList: action.data.ticketList,
        amount: action.data.amount,
      };
    }

    case actionTypes.RESET_DATA_BOOKTICKET: {
      return {
        ...state,
        cinemaInfo: {},
        paymentMethod: "",
        isReadyPayment: false,
        isSelectedSeat: false,
        selectedSeatList: [],
        timeOut: false,
        activeStep: 0,
        ticketList: [],
        successBookingTicketMessage: null,
        errorBookingTicketMessage: null,
        refreshKey: Date.now(),
        amount: 0,
      };
    }

    case actionTypes.SET_DATA_PAYMENT: {
      return {
        ...state,
        email: action.data.email,
        phone: action.data.phone,
        paymentMethod: action.data.paymentMethod,
      };
    }

    case actionTypes.SET_READY_PAYMENT: {
      return {
        ...state,
        isReadyPayment: action.data.isReadyPayment,
      };
    }
    case actionTypes.SET_STEP: {
      return {
        ...state,
        activeStep: action.data.activeStep,
      };
    }

    // booking ticket
    case actionTypes.BOOK_TICKET_REQUEST: {
      return {
        ...state,
        bookingTicketLoading: true,
        errorBookingTicketMessage: null,
      };
    }
    case actionTypes.BOOK_TICKET_SUCCESS: {
      return {
        ...state,
        successBookingTicketMessage: action.data,
        bookingTicketLoading: false,
        activeStep: 2,
      };
    }
    case actionTypes.BOOK_TICKET_FAIL: {
      return {
        ...state,
        errorBookingTicketMessage: action.error,
        bookingTicketLoading: false,
        activeStep: 2,
      };
    }

    // control modal
    case actionTypes.TIMEOUT: {
      return {
        ...state,
        timeOut: true,
      };
    }

    case actionTypes.CREATE_SHOWTIME_REQUEST: {
      return {
        ...state,
        createShowtimeLoading: true,
        errorCreateShowtime: null,
      };
    }
    case actionTypes.CREATE_SHOWTIME_SUCCESS: {
      return {
        ...state,
        successCreateShowtime: action.data,
        createShowtimeLoading: false,
      };
    }
    case actionTypes.CREATE_SHOWTIME_FAIL: {
      return {
        ...state,
        errorCreateShowtime: action.error,
        createShowtimeLoading: false,
      };
    }

    case actionTypes.RESET_CREATE_SHOWTIME: {
      return {
        ...state,
        createShowtimeLoading: false,
        successCreateShowtime: null,
        errorCreateShowtime: null,
      };
    }

    default:
      return state;
  }
};

export default BookingTicketReducer;
