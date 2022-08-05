import React, { Fragment } from "react";

import TheaterAddress from "./TheaterAddress";
import GoToCheckoutButton from "../GoToCheckoutButton/GoToCheckoutButton";
import TheaterName from "../TheaterName/TheaterName";
import {
  useStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "./TheaterItemStyle";

export default function TheaterItem({
  theaterName,
  showtimeID,
  showtime,
  defaultExpanded,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.cumRapItem}>
        <Accordion
          key={theaterName}
          square
          defaultExpanded={defaultExpanded ?? false}
        >
          <AccordionSummary>
            <div className={classes.wrapInfo}>
              <TheaterName theaterName={theaterName} />
              <TheaterAddress showtimeID={showtimeID} />
            </div>
            <div style={{ clear: "both" }}></div>
          </AccordionSummary>
          <AccordionDetails>
            {showtime.map((item) => (
              <Fragment key={item.maLichChieu}>
                <GoToCheckoutButton showtime={item} />
              </Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
