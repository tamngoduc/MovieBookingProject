import React from "react";
import useTheaterAddress from "../../tools/useTheaterAddress";

const TheaterAddress = ({ showtimeID }) => {
  const { address } = useTheaterAddress(showtimeID);
  const style = {
    fontSize: 14,
    color: "#9b9b9b",
  };
  return <p style={style}>{address}</p>;
};

export default TheaterAddress;
