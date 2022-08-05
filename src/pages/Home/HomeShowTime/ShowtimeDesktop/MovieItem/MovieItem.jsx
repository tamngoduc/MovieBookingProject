import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "../MovieItem/MovieItemStyle";
import PlayButton from "../../../../../components/PlayButton/PlayButton";
import useRunningTimeRatting from "../../../../../tools/useRunningTimeRatting";
import "./css/MovieItemCss.css";

const MovieItem = ({ movie }) => {
  const classes = useStyles({ bg: movie.hinhAnh });
  const navigate = useNavigate();
  const { runningTime } = useRunningTimeRatting(movie.maPhim);

  return (
    <div
      style={{
        padding: "7px",
        cursor: "pointer",
      }}
    >
      <div className="film">
        <div className="film__img">
          <div className={`film__poster ${classes.addbg}`}>
            <div
              className="film__overlay"
              onClick={() => navigate(`/phim/${movie.maPhim}`)}
            />
            <div className="play__trailer">
              <PlayButton
                cssRoot={"play"}
                width={48}
                height={48}
                urlYoutube={movie.trailer}
              />
            </div>
          </div>
        </div>
        <div className="film__content">
          <div className={`film__name ${runningTime ? "" : "not_hide"}`}>
            <div className="name">
              <p>
                <span className="c18">C18</span>
                {movie.tenPhim}
              </p>
            </div>
            <p className="pt-2">
              {runningTime ? (
                <span className="text_info">
                  {runningTime} phút - Tix {movie.danhGia}
                </span>
              ) : (
                <span className="text_info">Tix {movie.danhGia}</span>
              )}
            </p>
          </div>
          <div className={`film__button`}>
            {runningTime && (
              <Link
                style={{ background: runningTime ? "#fb4226" : "#60c5ef" }}
                to={{
                  pathname: `/phim/${movie.maPhim}`,
                }}
              >
                {runningTime ? "MUA VÉ" : "THÔNG TIN PHIM"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
