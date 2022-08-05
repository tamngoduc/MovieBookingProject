import React, { useState } from "react";
import Spacer from "../../../components/Spacer/Spacer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { underLine } from "../../../styles/materialUi";
import TheatersList from "./TheatersList/TheatersList";
import useStyles from "./HomeTheatersStyle";

const HomeTheaters = () => {
  const theme = useTheme();
  const isMobileTheater = useMediaQuery(theme.breakpoints.down("sm"));
  const { theaterSystemList, theaterSystemListError } = useSelector(
    (state) => state.TheaterReducer
  );
  const [theaterTabsValue, setTheaterTabsValue] = useState(0);
  const classes = useStyles({ isMobileTheater, underLine });

  if (theaterSystemListError) {
    return <div>{theaterSystemListError}</div>;
  }
  return (
    <div id="theater">
      <Spacer />
      <div className={classes.theater}>
        <Tabs
          variant={isMobileTheater ? "scrollable" : "standard"}
          scrollButtons="on"
          orientation={isMobileTheater ? "horizontal" : "vertical"}
          value={theaterTabsValue}
          classes={{ indicator: classes.tabs__indicator, root: classes.taps }}
        >
          {theaterSystemList.map((theaterSystem, index) => (
            <Tab
              onClick={() => setTheaterTabsValue(index)}
              disableRipple
              classes={{
                root: classes.tap,
                textColorInherit: classes.textColorInherit,
              }}
              key={theaterSystem.maHeThongRap}
              label={
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={theaterSystem.logo}
                  alt="theaterLogo"
                />
              }
            />
          ))}
        </Tabs>
        {theaterSystemList.map((theaterSystem, index) => (
          <div
            hidden={theaterTabsValue !== index}
            key={theaterSystem.maHeThongRap}
            className={classes.theaterWidth}
          >
            {/* {isMobileTheater ? (
              <MobileLstCumrap lstCumRap={theater.lstCumRap} />
            ) : (
              <TheatersList theaterList={theater.lstCumRap} />
            )} */}
            <TheatersList theaterList={theaterSystem.lstCumRap} />
          </div>
        ))}
      </div>
      <Spacer />
    </div>
  );
};

export default HomeTheaters;
