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

  movieList2: null,
  loadingMovieList2: false,
  errorMovieList2: null,

  successUpdateMovie: "",
  loadingUpdateMovie: false,
  errorUpdateMovie: null,

  successUpdateNoneImageMovie: "",
  loadingUpdateNoneImageMovie: false,
  errorUpdateNoneImageMovie: null,

  successAddUploadMovie: "",
  loadingAddUploadMovie: false,
  errorAddUploadMovie: null,

  saveBeforeinstallpromptEvent: null,
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

    case actionTypes.GET_MOVIE_LIST_REQUEST2: {
      return { ...state, loadingMovieList2: true, errorMovieList2: null };
    }
    case actionTypes.GET_MOVIE_LIST_SUCCESS2: {
      return {
        ...state,
        movieList2: action.data,
        loadingMovieList2: false,
      };
    }
    case actionTypes.GET_MOVIE_LIST_FAIL2: {
      return {
        ...state,
        errorMovieList2: action.error,
        loadingMovieList2: false,
      };
    }
    case actionTypes.POST_UPDATE_MOVIE_REQUEST: {
      return { ...state, loadingUpdateMovie: true, errorUpdateMovie: null };
    }
    case actionTypes.POST_UPDATE_MOVIE_SUCCESS: {
      return {
        ...state,
        successUpdateMovie: action.data,
        loadingUpdateMovie: false,
      };
    }
    case actionTypes.POST_UPDATE_MOVIE_FAIL: {
      return {
        ...state,
        errorUpdateMovie: action.error,
        loadingUpdateMovie: false,
      };
    }

    case actionTypes.UPDATE_NONEIMAGE_MOVIE_REQUEST: {
      return {
        ...state,
        loadingUpdateNoneImageMovie: true,
        errorUpdateNoneImageMovie: null,
      };
    }
    case actionTypes.UPDATE_NONEIMAGE_MOVIE_SUCCESS: {
      return {
        ...state,
        successUpdateNoneImageMovie: action.data,
        loadingUpdateNoneImageMovie: false,
      };
    }
    case actionTypes.UPDATE_NONEIMAGE_MOVIE_FAIL: {
      return {
        ...state,
        errorUpdateNoneImageMovie: action.error,
        loadingUpdateNoneImageMovie: false,
      };
    }

    case actionTypes.ADD_MOVIE_UPLOAD_REQUEST: {
      return {
        ...state,
        loadingAddUploadMovie: true,
        errorAddUploadMovie: null,
      };
    }
    case actionTypes.ADD_MOVIE_UPLOAD_SUCCESS: {
      return {
        ...state,
        successAddUploadMovie: action.data,
        loadingAddUploadMovie: false,
      };
    }
    case actionTypes.ADD_MOVIE_UPLOAD_FAIL: {
      return {
        ...state,
        errorAddUploadMovie: action.error,
        loadingAddUploadMovie: false,
      };
    }

    case actionTypes.RESET_MOVIE_MANAGEMENT: {
      return {
        ...state,
        loadingMovieList2: false,
        errorMovieList2: null,

        successDeleteMovie: "",
        loadingDeleteMovie: false,
        errorDeleteMovie: null,

        successUpdateMovie: "",
        loadingUpdateMovie: false,
        errorUpdateMovie: null,

        successUpdateNoneImageMovie: "",
        loadingUpdateNoneImageMovie: false,
        errorUpdateNoneImageMovie: null,

        successAddUploadMovie: "",
        loadingAddUploadMovie: false,
        errorAddUploadMovie: null,
      };
    }

    case actionTypes.SAVE_BEFOREINSTALLPROMPT_EVENT: {
      state.saveBeforeinstallpromptEvent = action.event;
      return state;
    }

    default:
      return state;
  }
};

export default MovieReducer;
