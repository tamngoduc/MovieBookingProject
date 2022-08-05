import movieAPI from "../../services/movieAPI";
import { SET_CAROUSEL } from "../constants/CarouselConstant";

export const getCarousel = () => {
  return async (dispatch) => {
    try {
      const data = await movieAPI.getBannerList();
      dispatch({ type: SET_CAROUSEL, data });
    } catch (error) {
      console.log(error);
    }
  };
};
