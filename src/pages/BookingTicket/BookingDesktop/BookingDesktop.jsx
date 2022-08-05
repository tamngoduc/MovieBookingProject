import React from "react";
import useStyles from "./BookingDesktopStyle";
import CheckoutStep from "./CheckoutStep/CheckoutStep";
import SeatList from "../SeatList/SeatList";
import Payment from "../Payment/Payment";

const BookingDesktop = () => {
  const classes = useStyles();

  return (
    <div className={classes.bookTicket}>
      <section className={classes.left}>
        <CheckoutStep />
        <SeatList />
      </section>
      <section className={classes.right}>
        <Payment />
      </section>
    </div>
  );
};

export default BookingDesktop;
