import * as actionTypes from "../constants/LazyConstant";
const initialState = {
  isLazy: false,
  // hiện loading khi đang tải component về máy
  isLoadingBackToHome: false,
  // hiện loading khi chuyển  từ component khác về component home
};

const LazyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_LAZY_MOUNT: {
      return {
        ...state,
        isLazy: true,
      };
    }

    case actionTypes.LOADING_LAZY_UNMOUNT: {
      return {
        ...state,
        isLazy: false,
      };
    }

    case actionTypes.LOADING_BACKTO_HOME: {
      return {
        ...state,
        isLoadingBackToHome: true,
      };
    }

    case actionTypes.LOADING_BACKTO_HOME_COMPLETED: {
      return {
        ...state,
        isLoadingBackToHome: false,
      };
    }

    default:
      return state;
  }
};
export default LazyReducer;
