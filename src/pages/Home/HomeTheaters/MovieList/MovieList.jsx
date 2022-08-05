import React from "react";
import useStyles from "./MovieListStyle";
import { customScrollbar } from "../../../../styles/materialUi";
import { underLine } from "../../../../styles/materialUi";
import ShowtimeList from "./ShowtimeList/ShowtimeList";
import RunningTimeRatting from "../../../../components/RunningTimeRatting/RunningTimeRatting";

const MovieList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.movieList} hidden={props.hidden}>
      {/* div root danh sách phim */}
      {props.movieList.map((movie) => (
        <div className={classes.movie} key={movie.maPhim}>
          <div className={classes.movie__info}>
            {/* div thong tin phim */}
            <img
              src={movie.hinhAnh}
              className={classes.movie__img}
              alt={movie.tenPhim}
            />
            <div className={classes.movie__text}>
              <p className={classes.movie__text_name}>{movie.tenPhim}</p>
              <RunningTimeRatting movieID={movie.maPhim} />
            </div>
          </div>
          <div>
            {/* div danh sách ngày giờ chiếu */}
            <ShowtimeList showtimeList={movie.lstLichChieuTheoPhim} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
