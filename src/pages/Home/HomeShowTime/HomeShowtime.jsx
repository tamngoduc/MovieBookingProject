import React, { useEffect, useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShowtimeDesktop from "./ShowtimeDesktop/ShowtimeDesktop";
import useStyles from "./HomeShowtimeStyle";

const HomeShowtime = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [value, setValue] = useState({ value: 0, fade: true, notDelay: 0 });
  const { movieList, movieListError } = useSelector(
    (state) => state.MovieReducer
  );
  const timeout = useRef(null);
  const classes = useStyles({
    fade: value.fade,
    value: value.value,
    notDelay: value.notDelay,
  });
  const [dataArr, setDataArr] = useState({
    dailyMovieList: [],
    comingMovieList: [],
  });
  const handleChange = (e, newValue) => {
    setValue((value) => ({ ...value, notDelay: newValue, fade: false }));
    timeout.current = setTimeout(() => {
      setValue((value) => ({ ...value, value: newValue, fade: true }));
    }, 100);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);
  useEffect(() => {
    const dailyMovieList = movieList.filter(
      (movie) => movie.dangChieu === true
    );
    const comingMovieList = movieList.filter(
      (movie) => movie.sapChieu === true
    );
    setDataArr((dataArr) => ({ ...dataArr, dailyMovieList, comingMovieList }));
  }, [movieList]);

  if (movieListError) {
    return <p>{movieListError}</p>;
  }
  return (
    <div style={{ paddingTop: "80px" }} id="showtime">
      <AppBar className={classes.appBar} position="static">
        <Tabs
          classes={{
            root: classes.tabBar,
            flexContainer: classes.flexContainer,
            indicator: classes.indicator,
          }}
          value={value.value}
          onChange={handleChange}
        >
          <Tab
            disableRipple
            className={`${classes.tabButton} ${classes.tabDangChieu}`}
            label="Đang chiếu"
          />
          <Tab
            disableRipple
            className={`${classes.tabButton} ${classes.tabSapChieu}`}
            label="Sắp chiếu"
          />
        </Tabs>
      </AppBar>
      <div className={classes.listMovie}>
        {/* {isDesktop ? (
          <Desktop arrayData={arrayData} value={value} />
        ) : (
          <Mobile arrayData={arrayData} value={value} />
        )} */}
        <ShowtimeDesktop dataArr={dataArr} value={value} />
      </div>
    </div>
  );
};

export default HomeShowtime;
