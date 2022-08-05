import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./ModalTrailerStyle";
import * as actionTypes from "../../redux/constants/ModalTrailerConstant";
import getYouTubeID from "get-youtube-id";

const ModalTrailer = () => {
  const { open, urlYoutube } = useSelector(
    (state) => state.ModalTrailerReducer
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    dispatch({
      type: actionTypes.CLOSE_MODAL,
      data: { open: false },
    });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      classes={{ paper: classes.paper }}
    >
      <iframe
        className={classes.iframe}
        src={`https://www.youtube.com/embed/${getYouTubeID(
          urlYoutube
        )}?autoplay=1`}
        allowFullScreen
        frameBorder="0"
        allow="autoplay"
        title="trailer movie"
      ></iframe>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <CloseIcon sx={{ color: "white" }} fontSize="small" />
      </IconButton>
    </Dialog>
  );
};

export default ModalTrailer;
