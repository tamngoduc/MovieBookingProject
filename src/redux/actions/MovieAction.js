import movieAPI from "../../services/movieAPI";
import * as actionTypes from "../constants/MovieConstant";

export const getMovieList = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_MOVIE_LIST_REQUEST });
    try {
      const data = await movieAPI.getMovieList();
      dispatch({ type: actionTypes.GET_MOVIE_LIST_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.GET_MOVIE_LIST_FAIL, error });
    }
  };
};

export const getMovie = (movieID) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_MOVIE_REQUEST });
    try {
      const data = await movieAPI.getMovieInfo(movieID);
      dispatch({ type: actionTypes.GET_MOVIE_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.GET_MOVIE_FAIL, error });
    }
  };
};

export const deletedMovie = () => {};
