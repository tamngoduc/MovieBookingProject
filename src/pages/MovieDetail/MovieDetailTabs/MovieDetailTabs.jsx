import React, { useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fade from "@material-ui/core/Fade";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { useLocation, useHistory } from "react-router-dom";
import Scroll from "../../../tools/scroll";
import useStyles from "./MovieDetailTabsStyle";
import ShowtimeDesktop from "./ShowtimeDesktop/ShowtimeDesktop";

const MovieDetailTabs = ({ data, onClickBuyBtn }) => {
  const classes = useStyles();
  let location = useLocation();
  const [valueTab, setValueTab] = useState(0);
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  const TabPanel = (props) => {
    const { isMobile, children, value, index, ...other } = props;
    return (
      <div hidden={value !== index} {...other}>
        <Box p={isMobile && index === 0 ? 0 : 2}>{children}</Box>
      </div>
    );
  };
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); // ngăn window.history.scrollRestoration = 'auto';
    setValueTab(() => 0);
    setScroll(() => onClickBuyBtn);
  }, [onClickBuyBtn]); // khi click muave thì mới mở tap 0 > đổi giá trị scroll để scroll tới movieDetailTabs

  useEffect(() => {
    if (onClickBuyBtn !== 0) {
      // không scroll khi mới load topDesktopMovieDetail
      Scroll("movieDetailTabs");
    }
  }, [scroll]); // khi nhấn muave và đã hoàn thành mở tab 0 thì scroll

  return (
    <div className={classes.root} id="movieDetailTabs">
      <AppBar
        position="static"
        color="default"
        classes={{ root: classes.appBarRoot }}
      >
        <Tabs
          value={valueTab}
          onChange={handleChange}
          centered
          classes={{ indicator: classes.indicator }}
        >
          {/* ẩn đi Lịch Chiếu nếu nhấn vào chi tiết phim bên tab sắp chiếu, (!location.state.comingMovie ? true : "") > cú pháp này sẽ return "" thay vì undefined > tránh lỗi material-ui */}
          {(!location.state?.comingMovie ? true : "") && (
            <Tab
              disableRipple
              label="Lịch Chiếu"
              classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
            />
          )}
          <Tab
            disableRipple
            label="Thông Tin"
            classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
          />
        </Tabs>
      </AppBar>
      <Fade
        timeout={400}
        in={valueTab === (location.state?.comingMovie ? "hide" : 0)}
      >
        <TabPanel
          value={valueTab}
          index={location.state?.comingMovie ? "hide" : 0}
          //   isMobile={isMobile}
        >
          {/* {isMobile ? <LichChieuMobile /> : <LichChieuDesktop data={data} />} */}
          <ShowtimeDesktop data={data} />
        </TabPanel>
      </Fade>
      <Fade
        timeout={400}
        in={valueTab === (location.state?.comingMovie ? 0 : 1)}
      >
        <TabPanel
          value={valueTab}
          index={location.state?.comingMovie ? 0 : 1}
          className={classes.noname}
        >
          <div className={`text-white ${classes.detailMovie}`}>
            <div className="mb-2">
              <p>{data.moTa}</p>
            </div>
          </div>
        </TabPanel>
      </Fade>
    </div>
  );
};

export default MovieDetailTabs;
