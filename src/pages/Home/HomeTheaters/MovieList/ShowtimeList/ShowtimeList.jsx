import React, { Fragment } from "react";
import GoToCheckoutButton from "../../../../../components/GoToCheckoutButton/GoToCheckoutButton";
import formatDate from "../../../../../tools/formatDate";
import useStyles from "./ShowtimeListStyle";

const ShowtimeList = ({ showtimeList }) => {
  const classes = useStyles();
  const dayOnlyArr = showtimeList.map((item) => {
    // tạo mảng mới chỉ chứa ngày
    return item.ngayChieuGioChieu.slice(0, 10);
    // item là "2020-12-17" cắt ra từ 2020-12-17T10:10:00
  });
  const differentDayArr = [...new Set(dayOnlyArr)];
  // xóa các ngày trùng lặp
  const filterByDay = (date) => {
    // lọc ra item từ mảng gốc
    const gioChieuRenDer = showtimeList.filter((item) => {
      if (item.ngayChieuGioChieu.slice(0, 10) === date) {
        return true;
      }
      return false;
    });
    return gioChieuRenDer;
  };

  return (
    <div className={classes.showtimeList}>
      {differentDayArr.map((date) => (
        <Fragment key={date}>
          <p className={classes.showtime}>{formatDate(date).dateFull}</p>
          {/*in ra ngày hiện tại*/}
          <div className={classes.groupTime}>
            {filterByDay(date).map((showtime) => (
              <Fragment key={showtime.maLichChieu}>
                <GoToCheckoutButton showtime={showtime} />
              </Fragment>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default ShowtimeList;
