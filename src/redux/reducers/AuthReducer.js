import * as actionTypes from "../constants/AuthConstant";

const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  currentUser: currentUser,
  loginLoading: false,
  loginError: null,

  registerResponse: null,
  registerLoading: false,
  registerError: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, loginLoading: true, loginError: null };

    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loginLoading: false, currentUser: action.data };

    case actionTypes.LOGIN_FAIL:
      localStorage.removeItem("user");
      return { ...state, loginLoading: false, loginError: action.error };

    case actionTypes.LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        currentUser: null,
        registerResponse: null,
        error: null,
        loading: false,
      };

    case actionTypes.REGISTER_REQUEST: {
      return { ...state, registerLoading: true, registerError: null };
    }

    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        registerResponse: action.data,
        loadingRegister: false,
      };
    }

    case actionTypes.REGISTER_FAIL: {
      return {
        ...state,
        registerError: action.error,
        loadingRegister: false,
      };
    }

    case actionTypes.RESET_ERROR_LOGIN_REGISTER: {
      return {
        ...state,
        registerError: null,
        loginError: null,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
