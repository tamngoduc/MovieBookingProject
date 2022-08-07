import * as actionTypes from "../constants/TheaterConstant";

const initialState = {
  theaterSystemList: [],
  theaterSystemListLoading: false,
  theaterSystemListError: null,

  theaterSystemList2: [],
  theaterSystemListLoading2: false,
  theaterSystemListError2: null,
};

const TheaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_THEATER_BRANCHES_SHOWTIME_REQUEST:
      return {
        ...state,
        theaterSystemListLoading: true,
        theaterListError: null,
      };

    case actionTypes.GET_THEATER_BRANCHES_SHOWTIME_SUCCESS:
      return {
        ...state,
        theaterSystemListLoading: false,
        theaterSystemList: action.data,
      };

    case actionTypes.GET_THEATER_BRANCHES_SHOWTIME_FAIL:
      return {
        ...state,
        theaterSystemListLoading: false,
        theaterSystemListError: action.error,
      };

    default:
      return state;
  }
};

export default TheaterReducer;
