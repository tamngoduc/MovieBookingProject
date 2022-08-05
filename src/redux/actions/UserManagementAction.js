import userAPI from "../../services/userAPI";
import * as actionTypes from "../constants/UserManagementConstant";

export const getUserList = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_LIST_REQUEST });
    try {
      const data = await userAPI.getUserList();
      dispatch({ type: actionTypes.GET_USER_LIST_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.GET_USER_LIST_FAIL, error });
    }
  };
};

export const deleteUser = (account) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST });
    try {
      const data = await userAPI.deleteUser(account);
      dispatch({ type: actionTypes.DELETE_USER_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.DELETE_USER_FAIL, error });
    }
  };
};

export const resetUserList = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_USER_LIST });
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_USER_REQUEST });
    try {
      const data = await userAPI.editUserInfo(user);
      dispatch({ type: actionTypes.UPDATE_USER_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.UPDATE_USER_FAIL, error });
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_USER_REQUEST });
    try {
      const data = await userAPI.addUser(user);
      dispatch({ type: actionTypes.ADD_USER_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.ADD_USER_FAIL, error });
    }
  };
};

export const getAccountInfo = (user) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_INFO_REQUEST });
    try {
      const data = await userAPI.getAccountInfo(user);
      dispatch({ type: actionTypes.GET_USER_INFO_SUCCESS, data });
    } catch (error) {
      dispatch({ type: actionTypes.GET_USER_INFO_FAIL, error });
    }
  };
};
