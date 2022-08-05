import React, { Fragment } from "react";
import Header from "./Layout/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import ScrollToTop from "react-scroll-up";
import { makeStyles } from "@material-ui/core";

const HomeTemplate = () => {
  const useStyles = makeStyles((theme) => ({
    top: {
      marginTop: 64,
      [theme.breakpoints.down("xs")]: {
        marginTop: 56,
      },
    },
    styleScrollToTop: {
      position: "fixed",
      bottom: 30,
      right: 10,
      transitionTimingFunction: "linear",
      width: 50,
      transform: "rotate(180deg)",
      zIndex: 5000,
    },
  }));
  const classes = useStyles();

  return (
    <Fragment>
      <Header />
      {/* <div className={classes.top}></div> */}
      <Outlet />
      <Footer />
      <ScrollToTop showUnder={160}>
        <img
          src="/img/logoTixLoading.png"
          alt="totop"
          className={classes.styleScrollToTop}
        />
      </ScrollToTop>
    </Fragment>
  );
};

export default HomeTemplate;
