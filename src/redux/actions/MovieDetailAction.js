import * as actionTypes from "../constants/MovieDetailConstant";
import theaterAPI from "../../services/theaterAPI";

export const getMovieShowtime = (movieID) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_MOVIE_SHOWTIME_REQUEST });
    try {
      const data = await theaterAPI.getMovieShowtime(movieID);
      dispatch({ type: actionTypes.GET_MOVIE_SHOWTIME_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.GET_MOVIE_SHOWTIME_FAIL, error });
    }
  };
};
