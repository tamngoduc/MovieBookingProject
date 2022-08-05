import React from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "./GoToCheckoutButtonStyle";

const GoToCheckoutButton = ({ showtime }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const calculateTimeout = (startTime) => {
    const fakeRunningTime = 120;
    const timeInObj = new Date(startTime);
    const timeOutObj = new Date(
      timeInObj.getTime() + fakeRunningTime * 60 * 1000
    );
    return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
  };

  return (
    <button
      className={classes.button}
      onClick={() => navigate(`/datve/${showtime.maLichChieu}`)}
    >
      <span className={classes.inTime}>
        {showtime.ngayChieuGioChieu.slice(11, 16)}
      </span>
      <span className={classes.outTime}>{` ~ ${calculateTimeout(
        showtime.ngayChieuGioChieu
      )}`}</span>
    </button>
  );
};

export default GoToCheckoutButton;
