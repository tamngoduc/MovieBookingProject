import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCarousel } from "../../../redux/actions/CarouselAction";
import Slider from "react-slick";
import useStyles from "./HomeCarouselStyle";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import PlayButton from "../../../components/PlayButton/PlayButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";

const HomeCarousel = () => {
  const dispatch = useDispatch();
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCarousel());
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <ArrowForwardIosRoundedIcon
        style={{ right: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <ArrowBackIosRoundedIcon
        style={{ left: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 5000, //speed per sence
    autoplay: false,
    speed: 500,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slickdotsbanner",
  };

  return (
    <div className={classes.carousel}>
      <Slider {...settings}>
        {arrImg.map((item) => {
          return (
            <div key={item.maBanner} className={classes.itemSlider}>
              <img src={item.hinhAnh} alt="banner" className={classes.img} />
              {isDesktop && (
                <PlayButton
                  cssRoot={"play"}
                  urlYoutube="https://www.youtube.com/watch?v=8jraVtX821Q&t=1s"
                />
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HomeCarousel;
