import React, { useEffect, useRef, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useHandleVibrateLazy from "../../tools/useHandleVibrateLazy";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: (props) => (props.effectFadeOut ? "transparent" : "#fff"),
    zIndex: -1,
    transition: "background-color 0.6s ease-in-out",

    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  visible: {
    zIndex: 99999,
  },
  image: {
    width: (props) => (props.isDesktop ? 250 : 100),
    animation: "$shake 0.6s infinite",
    position: "relative",
  },
  fadeIn: {
    animationName: "$fadeIn",
    animationDuration: "0.6s",
  },
  fadeOut: {
    animationName: "$fadeOut",
    animationDuration: "0.6s",
  },
  "@keyframes shake": {
    "0%": { transform: "rotate(-10deg)" },
    "50%": { transform: "rotate(10deg)" },
    "100%": { transform: "rotate(-10deg)" },
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "scale(0.6,0.6)" },
    "70%": { opacity: 0.7, transform: "scale(1.1,1.1)" },
    "100%": { opacity: 1, transform: "scale(1)" },
  },
  "@keyframes fadeOut": {
    "0%": { opacity: 1, transform: "scale(1)" },
    "70%": { opacity: 0.7, transform: "scale(1.1,1.1)" },
    "100%": { opacity: 0, transform: "scale(0.6,0.6)" },
  },
});

const Loading = () => {
  const isLazy = useHandleVibrateLazy();
  const isLoadingBackToHome = useSelector(
    (state) => state.LazyReducer.isLoadingBackToHome
  );
  const movieListLoading = useSelector(
    (state) => state.MovieReducer.movieListLoading
  );
  const cinemaInfoLoading = useSelector(
    (state) => state.BookingTicketReducer.cinemaInfoLoading
  );
  const movieShowtimeListLoading = useSelector(
    (state) => state.MovieDetailReducer.movieShowtimeListLoading
  );
  const loading =
    isLazy ||
    movieListLoading ||
    cinemaInfoLoading ||
    movieShowtimeListLoading ||
    isLoadingBackToHome;
  const loadingPrevious = useRef(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [controlEffect, setControlEffect] = useState({
    visible: false,
    effectFadeIn: false,
    effectFadeOut: false,
  });
  const eFadeEffect = useRef(null);
  const materialStyles = useStyles({
    isDesktop,
    loading,
    visible: controlEffect.visible,
    effectFadeOut: controlEffect.effectFadeOut,
  });

  useEffect(() => {
    // loadding chuyển từ false sang true
    if (Number(loadingPrevious.current) < Number(loading)) {
      setControlEffect((data) => ({
        ...data,
        visible: true,
        effectFadeIn: true,
        effectFadeOut: false,
      }));
      loadingPrevious.current = true;
      // loadding chuyển từ true sang false
    } else if (Number(loadingPrevious.current) > Number(loading)) {
      setControlEffect((data) => ({
        ...data,
        visible: true,
        effectFadeIn: false,
        effectFadeOut: true,
      }));
      loadingPrevious.current = false;
      // khi fadeOut kết thúc thì reset loading
      eFadeEffect.current?.addEventListener("animationend", resetAnimation);
    }
  }, [loading]);

  const resetAnimation = useCallback((e) => {
    // dùng useCallback vì removeEventListener chỉ xóa sự kiện dựa trên cùng một function
    eFadeEffect.current?.removeEventListener("animationend", resetAnimation);
    setControlEffect((data) => ({
      ...data,
      visible: false,
      effectFadeIn: false,
      effectFadeOut: false,
    }));
  }, []);

  return (
    <div
      className={clsx(
        `${materialStyles.root}`,
        controlEffect.visible && `${materialStyles.visible}`
      )}
      // khi chuyển url > component mới chưa load xong (zIndex: -1) nên loading hiện ra > cần ẩn đi lúc đó để hiệu ứng fadeIn mượt hơn
      style={{ display: controlEffect.visible ? "flex" : "none" }}
    >
      <div
        ref={eFadeEffect}
        className={clsx(
          controlEffect.effectFadeIn && `${materialStyles.fadeIn}`,
          controlEffect.effectFadeOut && `${materialStyles.fadeOut}`
        )}
      >
        <img
          src="/img/logoTixLoading.png"
          className={materialStyles.image}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Loading;
