import userAPI from "../../services/userAPI";
import * as actionTypes from "../constants/AuthConstant";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    try {
      const data = await userAPI.login(user);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: actionTypes.LOGIN_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.LOGIN_FAIL, error });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT });
  };
};

export const register = (user) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    try {
      const data = await userAPI.register(user);
      dispatch({ type: actionTypes.REGISTER_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.REGISTER_FAIL, error });
    }
  };
};

export const resetErrorLoginRegister = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_ERROR_LOGIN_REGISTER,
    });
  };
};
