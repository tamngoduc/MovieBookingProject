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

export const deleteMovie = (movieID) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_MOVIE_REQUEST });
    try {
      const data = await movieAPI.deleleMovie(movieID);
      dispatch({ type: actionTypes.DELETE_MOVIE_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.DELETE_MOVIE_FAIL, error });
    }
  };
};

export const getMovieListManagement = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_MOVIE_LIST_REQUEST2 });
    try {
      const data = await movieAPI.getMovieList();
      dispatch({ type: actionTypes.GET_MOVIE_LIST_SUCCESS2, data });
    } catch (error) {
      dispatch({ type: actionTypes.GET_MOVIE_LIST_FAIL2, error });
    }
  };
};

export const updateMovieUpload = (movie) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.POST_UPDATE_MOVIE_REQUEST });
    try {
      const data = await movieAPI.updateMovieUpload(movie);
      dispatch({ type: actionTypes.POST_UPDATE_MOVIE_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.POST_UPDATE_MOVIE_FAIL, error });
    }
  };
};

export const updateMovie = (movie) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_NONEIMAGE_MOVIE_REQUEST });
    try {
      const data = await movieAPI.updateMovie(movie);
      dispatch({ type: actionTypes.UPDATE_NONEIMAGE_MOVIE_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.UPDATE_NONEIMAGE_MOVIE_FAIL, error });
    }
  };
};

export const addMovieUpload = (movie) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_MOVIE_UPLOAD_REQUEST });
    try {
      const data = await movieAPI.addNewMovie(movie);
      dispatch({ type: actionTypes.ADD_MOVIE_UPLOAD_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.ADD_MOVIE_UPLOAD_FAIL, error });
    }
  };
};

export const resetMoviesManagement = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_MOVIE_MANAGEMENT,
    });
  };
};

export const saveBeforeinstallpromptEvent = (event) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_BEFOREINSTALLPROMPT_EVENT,
      event,
    });
  };
};
