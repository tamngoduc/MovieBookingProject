import React, { useState } from "react";
import TheaterName from "../../../../components/TheaterName/TheaterName";
import { underLine, customScrollbar } from "../../../../styles/materialUi";
import MovieList from "../MovieList/MovieList";

import useStyles from "./TheatersListStyle";

const TheatersList = ({ theaterList }) => {
  const [theaterListValue, setTheaterListValue] = useState(0);
  const classes = useStyles({ underLine, customScrollbar });
  const handleChangeTheater = (e) => {
    setTheaterListValue(Number(e.currentTarget.getAttribute("index")));
  };

  return (
    <div className={classes.flexTheater}>
      <div className={classes.theaterList}>
        {theaterList.map((theater, index) => (
          <div
            className={classes.theater}
            index={index}
            onClick={(e) => handleChangeTheater(e)}
            key={theater.maCumRap}
            style={{ opacity: theaterListValue === index ? "1" : ".5" }}
          >
            <img
              src={theater.hinhAnh}
              className={classes.theater__img}
              alt="theater"
            />
            <div className={classes.theater__info}>
              <TheaterName theaterName={theater.tenCumRap} />
              <p className={classes.theater__address}>{theater.diaChi}</p>
            </div>
          </div>
        ))}
      </div>
      {theaterList.map((theater, index) => (
        <MovieList
          movieList={theater.danhSachPhim}
          key={theater.maCumRap}
          hidden={theaterListValue !== index}
        />
      ))}
    </div>
  );
};

export default TheatersList;
