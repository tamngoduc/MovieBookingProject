import * as actionTypes from "../constants/ModalTrailerConstant";

const initialState = {
  open: false,
  urlYoutube: "",
};

const ModalTrailerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        open: action.data.open,
        urlYoutube: action.data.urlYoutube,
      };

    case actionTypes.CLOSE_MODAL:
      return { ...state, open: action.data.open, urlYoutube: "" };

    default:
      return state;
  }
};

export default ModalTrailerReducer;
