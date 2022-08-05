import * as actionTypes from "../constants/MovieConstant";

const initialState = {
  movieList: [],
  movieListLoading: false,
  movieListError: null,

  movie: {},
  movieLoading: false,
  movieError: null,

  deletedMovieSuccess: "",
  deletedMovieLoading: false,
  deletedMovieError: null,
};

const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MOVIE_LIST_REQUEST:
      return { ...state, movieListLoading: true, movieListError: null };

    case actionTypes.GET_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        movieListLoading: false,
        movieList: action.data,
      };

    case actionTypes.GET_MOVIE_LIST_FAIL:
      return {
        ...state,
        movieListLoading: false,
        movieListError: action.error,
      };

    case actionTypes.GET_MOVIE_REQUEST:
      return { ...state, movieLoading: true, movieError: null };

    case actionTypes.GET_MOVIE_SUCCESS:
      return {
        ...state,
        movieLoading: false,
        movie: action.data,
      };

    case actionTypes.GET_MOVIE_FAIL:
      return {
        ...state,
        movieLoading: false,
        movieError: action.error,
      };

    case actionTypes.DELETE_MOVIE_REQUEST:
      return { ...state, deletedMovieLoading: true, deletedMovieError: null };

    case actionTypes.DELETE_MOVIE_SUCCESS:
      return {
        ...state,
        deletedMovieLoading: false,
        deletedMovieSuccess: action.data,
      };

    case actionTypes.DELETE_MOVIE_FAIL:
      return {
        ...state,
        deletedMovieLoading: false,
        deletedMovieError: action.error,
      };

    default:
      return state;
  }
};

export default MovieReducer;
