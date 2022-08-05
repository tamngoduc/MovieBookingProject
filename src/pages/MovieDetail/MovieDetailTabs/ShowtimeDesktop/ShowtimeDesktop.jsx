import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RightSection from "./RightSection";
import useStyles from "./ShowtimeDesktopStyle";

export default function LichChieuDesktop({ data }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        classes={{ root: classes.leftSection, indicator: classes.indicator }}
      >
        {data?.heThongRapChieu?.map((theaterSystem) => (
          <Tab
            disableRipple
            key={theaterSystem.maHeThongRap}
            classes={{ wrapper: classes.wrapper, root: classes.tabRoot }}
            label={
              <>
                <img
                  className={classes.logo}
                  src={theaterSystem.logo}
                  alt="logoTheater"
                />
                <span>{theaterSystem.tenHeThongRap}</span>
              </>
            }
          />
        ))}
      </Tabs>
      <div className={classes.rightSection}>
        {data?.heThongRapChieu?.length === 0 && (
          <p style={{ padding: 10 }}>
            Hiện tại chưa có lịch chiếu cho phim này
          </p>
        )}
        {data?.heThongRapChieu?.map((theaterSystem, index) => (
          <div
            key={theaterSystem.maHeThongRap}
            style={{ display: value === index ? "block" : "none" }}
          >
            <RightSection currentSelectedTheaterSys={theaterSystem} />
          </div>
        ))}
      </div>
    </div>
  );
}
