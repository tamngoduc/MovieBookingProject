import * as actionTypes from "../constants/MovieDetailConstant";

const initialState = {
  movieShowtimeList: [],
  movieShowtimeListLoading: false,
  movieShowtimeListError: null,
};

const MovieDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MOVIE_SHOWTIME_REQUEST:
      return {
        ...state,
        movieShowtimeListLoading: true,
        movieShowtimeListError: null,
      };

    case actionTypes.GET_MOVIE_SHOWTIME_SUCCESS:
      return {
        ...state,
        movieShowtimeListLoading: false,
        movieShowtimeList: action.data,
      };

    case actionTypes.GET_MOVIE_SHOWTIME_FAIL:
      return {
        ...state,
        movieShowtimeListLoading: false,
        movieShowtimeListError: action.error,
      };

    case actionTypes.RESET_MOVIEDETAIL_REDUCER: {
      return {
        ...state,
        movieShowtimeList: [],
        movieShowtimeListLoading: false,
        movieShowtimeListError: null,
      };
    }

    default:
      return state;
  }
};

export default MovieDetailReducer;
