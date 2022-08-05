import React from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../redux/constants/ModalTrailerConstant";
import useStyles from "./PlayButtonStyle";

const PlayButton = ({ cssRoot, width, height, urlYoutube }) => {
  const classes = useStyles({ width, height });

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({
      type: actionTypes.OPEN_MODAL,
      data: {
        open: true,
        urlYoutube,
      },
    });
  };

  return (
    <div className={`${classes.button} ${cssRoot}`}>
      <img
        src="/img/carousel/play-video.png"
        className={classes.imgPlay}
        onClick={() => openModal()}
        alt="play"
      />
    </div>
  );
};

export default PlayButton;
