import theaterAPI from "../../services/theaterAPI";
import * as actionTypes from "../constants/TheaterConstant";

export const getTheaters = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_THEATER_BRANCHES_SHOWTIME_REQUEST });
    try {
      const data = await theaterAPI.getTheaterBranchesShowtime();
      dispatch({
        type: actionTypes.GET_THEATER_BRANCHES_SHOWTIME_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({ type: actionTypes.GET_THEATER_BRANCHES_SHOWTIME_FAIL, error });
    }
  };
};
