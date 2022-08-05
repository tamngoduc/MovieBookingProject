import React from "react";
import useRunningTimeRatting from "../../tools/useRunningTimeRatting";

const RunningTimeRatting = ({ movieID }) => {
  const { runningTime, ratting } = useRunningTimeRatting(movieID);
  const style = {
    fontSize: 12,
    color: "#9b9b9b",
  };
  return (
    <span style={{ style }}>
      {`${runningTime ?? "120"} phút - Điểm Tix ${ratting}`}
    </span>
  );
};

export default RunningTimeRatting;
