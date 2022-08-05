import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PlayButton from "../../../components/PlayButton/PlayButton";
import formatDate from "../../../tools/formatDate";
import UseRunningTimeRatting from "../../../tools/useRunningTimeRatting";
import { useLocation } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./MovieDetailDesktopStyle";
import MovieDetailTabs from "../MovieDetailTabs/MovieDetailTabs";

const MovieDetailDesktop = ({ movieShowtimeList: data }) => {
  const classes = useStyles({ bannerImg: data?.hinhAnh });
  const params = useParams();
  const { runningTime, ratting } = UseRunningTimeRatting(params.maPhim);
  const [onClickBuyBtn, setOnClickBuyBtn] = useState(0);
  const handleBuyBtn = () => {
    setOnClickBuyBtn(Date.now());
  };
  let location = useLocation();

  return (
    <div className={classes.desktop}>
      <div className={classes.top}>
        <div className={classes.gradient}></div>
        <div className={classes.bannerBlur}></div>
        <div className={classes.topInfo}>
          <div className={classes.imgTrailer}>
            <PlayButton urlYoutube={data?.trailer} />
            {/* xử lý khi url hình bị lỗi */}
            <img src={data.hinhAnh} alt="poster" />
          </div>
          <div className={classes.shortInfo}>
            <p>{formatDate(data.ngayKhoiChieu?.slice(0, 10)).YyMmDd}</p>
            <p className={classes.movieName}>
              <span className={classes.c18}>C18</span>
              {data.tenPhim}
            </p>
            <p>
              {`${runningTime ?? "120"} phút - ${ratting} Tix`} - 2D/Digital
            </p>
            <button className={classes.btnMuaVe} onClick={handleBuyBtn}>
              {location.state?.comingMovie ? "Thông tin phim" : "Mua vé"}
            </button>
          </div>
          <div className={classes.rate}>
            <div className={classes.circular}>
              <span className={classes.danhGia}>{ratting}</span>
              <CircularProgress
                variant="determinate"
                size="100%"
                value={100}
                className={classes.behined}
                color="secondary"
              />
              <CircularProgress
                variant="determinate"
                size="100%"
                value={ratting * 10}
                className={classes.fabProgress}
                color="secondary"
              />
            </div>
            <div className={classes.rateStar}>
              <Rating value={(ratting * 5) / 10} precision={0.5} readOnly />
            </div>
          </div>
        </div>
      </div>
      <MovieDetailTabs
        data={data}
        onClickBuyBtn={onClickBuyBtn}
        // isMobile={isMobile}
      />
    </div>
  );
};

export default MovieDetailDesktop;
