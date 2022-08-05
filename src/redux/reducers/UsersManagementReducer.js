import * as actionTypes from "../constants/UserManagementConstant";

const initialState = {
  usersList: null,
  usersListLoading: false,
  userListError: null,

  deleteSuccess: "",
  deleteLoading: false,
  deleteError: null,

  updateUserSuccess: null,
  updateUserLoading: false,
  updateUserError: null,

  addUserSuccess: null,
  addUserLoading: false,
  addUserError: null,

  isExistUserModified: false,

  userInfoSuccess: null,
  userInfoLoading: false,
  userInfoError: null,
};

const UsersManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LIST_REQUEST: {
      return { ...state, usersListLoading: true, userListError: null };
    }
    case actionTypes.GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        usersList: action.data,
        usersListLoading: false,
      };
    }
    case actionTypes.GET_USER_LIST_FAIL: {
      return {
        ...state,
        userListError: action.error,
        usersListLoading: false,
      };
    }

    case actionTypes.DELETE_USER_REQUEST: {
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
        deleteSuccess: "",
      };
    }
    case actionTypes.DELETE_USER_SUCCESS: {
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: action.data,
        deleteError: null,
      };
    }
    case actionTypes.DELETE_USER_FAIL: {
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.error,
        deleteSuccess: "",
      };
    }
    case actionTypes.RESET_USER_LIST: {
      return {
        ...state,
        userListError: null,

        deleteSuccess: "",
        deleteError: null,

        updateUserSuccess: null,
        updateUserError: null,
      };
    }

    case actionTypes.UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserLoading: true,
        updateUserError: null,
        updateUserSuccess: null,
      };
    }
    case actionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserLoading: false,
        updateUserSuccess: action.data,
        updateUserError: null,
      };
    }
    case actionTypes.UPDATE_USER_FAIL: {
      return {
        ...state,
        updateUserLoading: false,
        updateUserError: action.error,
        updateUserSuccess: null,
      };
    }

    case actionTypes.ADD_USER_REQUEST: {
      return {
        ...state,
        addUserLoading: true,
        addUserError: null,
        addUserSuccess: null,
      };
    }
    case actionTypes.ADD_USER_SUCCESS: {
      return {
        ...state,
        addUserLoading: false,
        addUserSuccess: action.data,
        addUserError: null,
      };
    }
    case actionTypes.ADD_USER_FAIL: {
      return {
        ...state,
        addUserLoading: false,
        addUserError: action.error,
        addUserSuccess: null,
      };
    }

    case actionTypes.SET_IS_EXIST_USER_MODIFIED: {
      state.isExistUserModified = action.isExistUserModified;
      return state;
    }

    case actionTypes.GET_USER_INFO_REQUEST: {
      return { ...state, userInfoLoading: true, userInfoError: null };
    }
    case actionTypes.GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfoSuccess: action.data,
        userInfoLoading: false,
      };
    }
    case actionTypes.GET_USER_INFO_FAIL: {
      return {
        ...state,
        userInfoError: action.error,
        userInfoLoading: false,
      };
    }
    default:
      return state;
  }
};
export default UsersManagementReducer;
