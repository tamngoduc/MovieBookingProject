import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieList } from "../../redux/actions/MovieAction";
import { getTheaters } from "../../redux/actions/TheaterAction";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import HomeShowtime from "./HomeShowTime/HomeShowtime";
import HomeTheaters from "./HomeTheaters/HomeTheaters";

const Home = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.MovieReducer.movieList);
  const theaterSystemList = useSelector(
    (state) => state.TheaterReducer.theaterSystemList
  );

  useEffect(() => {
    if (!movieList.length) {
      dispatch(getMovieList());
    }
    if (!theaterSystemList.length) {
      dispatch(getTheaters());
    }
  }, []);

  return (
    <div>
      <HomeCarousel />
      <HomeShowtime />
      <HomeTheaters />
    </div>
  );
};

export default Home;
