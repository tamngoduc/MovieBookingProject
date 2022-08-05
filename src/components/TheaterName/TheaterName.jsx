import React from "react";

const TheaterName = ({ theaterName, fontSize }) => {
  return (
    <p
      style={{
        color: "#795548",
        fontWeight: "500",
        fontSize: fontSize ? fontSize : 14,
      }}
    >
      <span>{theaterName?.split("-")[0]}</span>
      <span style={{ color: "#000", fontWeight: "500" }}>
        -{theaterName?.split("-")[1]}
      </span>
    </p>
  );
};

export default TheaterName;
