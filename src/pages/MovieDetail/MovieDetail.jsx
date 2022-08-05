import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieShowtime } from "../../redux/actions/MovieDetailAction";
import MovieDetailDesktop from "./MovieDetailDesktop/MovieDetailDesktop";
import * as actionTypes from "../../redux/constants/MovieDetailConstant";

const MovieDetail = () => {
  const { movieShowtimeList, movieShowtimeListError } = useSelector(
    (state) => state.MovieDetailReducer
  );
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieShowtime(params.maPhim));
    return () => {
      dispatch({ type: actionTypes.RESET_MOVIEDETAIL_REDUCER });
    };
  }, []);

  if (movieShowtimeListError) {
    return <div>{movieShowtimeListError}</div>;
  }
  return (
    <>
      <MovieDetailDesktop movieShowtimeList={movieShowtimeList} />
    </>
  );
};

export default MovieDetail;
