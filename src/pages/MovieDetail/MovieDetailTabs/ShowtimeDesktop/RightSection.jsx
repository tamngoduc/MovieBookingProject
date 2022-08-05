import React, { useState, useMemo } from "react";
import formatDate from "../../../../tools/formatDate";
import TheaterItem from "../../../../components/TheaterItem/TheaterItem";
import useStyles from "./ShowtimeDesktopStyle";
import selectDesktopData from "../../../../tools/useMovieDetailData";

const RightSection = ({ currentSelectedTheaterSys }) => {
  const [indexSelected, setindexSelected] = useState(0);
  const desktopData = useMemo(
    () => selectDesktopData(currentSelectedTheaterSys),
    [currentSelectedTheaterSys]
  );
  const classes = useStyles();

  const handleSelectDay = (i) => {
    setindexSelected(i);
  };

  return (
    <div>
      <div className={classes.listDay}>
        {desktopData?.arrayDay?.map((day, i) => (
          <div
            className={classes.dayItem}
            key={day}
            style={{ color: i === indexSelected ? "#fb4226" : "#000" }}
            onClick={() => handleSelectDay(i)}
          >
            <p>{formatDate(day).dayToday}</p>
            <p
              style={{
                fontSize: i === indexSelected ? "18px" : "16px",
                transition: "all .2s",
              }}
            >
              {formatDate(day).YyMmDd}
            </p>
          </div>
        ))}
      </div>
      {desktopData?.allArrayCumRapChieuFilterByDay?.map(
        (arrayCumRapChieuFilterByDay, i) => (
          <div
            style={{ display: indexSelected === i ? "block" : "none" }}
            key={i}
          >
            {arrayCumRapChieuFilterByDay.map((item) => (
              <TheaterItem
                key={item.tenCumRap}
                theaterName={item.tenCumRap}
                showtimeID={item.maLichChieu}
                showtime={item.lichChieuPhim}
                defaultExpanded={true}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default RightSection;
