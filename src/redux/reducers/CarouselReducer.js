import { SET_CAROUSEL } from "../constants/CarouselConstant";

const initialState = {
  arrImg: [
    {
      maBanner: "",
      maPhim: "",
      hinhAnh: "",
    },
  ],
};
const CarouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAROUSEL:
      return { ...state, arrImg: action.data };

    default:
      return state;
  }
};

export default CarouselReducer;
