import React, { useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import Countdown, { zeroPad } from "react-countdown";
import { TIMEOUT } from "../../../redux/constants/BookingTicketConstant";

const CountDown = () => {
  const {
    bookingTicketLoading,
    successBookingTicketMessage,
    errorBookingTicketMessage,
  } = useSelector((state) => state.BookingTicketReducer);
  const dispatch = useDispatch();
  const setTimeCount = useMemo(() => {
    return Date.now() + 300000;
  }, []);

  const handleTimeOut = () => {
    // chỉ mở modal khi chưa click đặt vé
    if (
      !bookingTicketLoading &&
      !(successBookingTicketMessage || errorBookingTicketMessage)
    ) {
      dispatch({
        type: TIMEOUT,
      });
    }
  };
  const style = {
    fontWeight: 500,
    fontSize: 34,
    color: "#fb4226",
    lineHeight: "39px",
  };
  return (
    <Countdown
      date={setTimeCount}
      renderer={({ minutes, seconds }) => (
        <span style={style}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
      onComplete={() => handleTimeOut()}
    />
  );
};

export default CountDown;
