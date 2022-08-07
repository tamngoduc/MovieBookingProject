import React from "react";
import { useSelector } from "react-redux";
import { theaterColor } from "../../../util/config";
import useStyles from "./BookingTicketResultStyle";

const BookingTicketResult = () => {
  const {
    amount,
    email,
    phone,
    paymentMethod,
    selectedSeatList,
    successBookingTicketMessage,
    errorBookingTicketMessage,
    cinemaInfo: { thongTinPhim },
  } = useSelector((state) => state.BookingTicketReducer);
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const classes = useStyles({
    thongTinPhim,
    color: theaterColor[thongTinPhim?.tenCumRap.slice(0, 3).toUpperCase()],
  });

  return (
    <div className={classes.resultBookticket}>
      <div className={classes.infoTicked}>
        <div className={classes.infoTicked__img}></div>
        <div className={classes.infoTicked__txt}>
          <p className={classes.movie__name}>{thongTinPhim?.tenPhim}</p>
          <p className={classes.text__first}>
            <span>{thongTinPhim?.tenCumRap.split("-")[0]}</span>
            <span className={classes.text__second}>
              -{thongTinPhim?.tenCumRap.split("-")[1]}
            </span>
          </p>
          <p className={classes.address}>{thongTinPhim?.diaChi}</p>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td valign="top">Suất chiếu:</td>
                <td valign="top">{`${thongTinPhim?.gioChieu} ${thongTinPhim?.ngayChieu}`}</td>
              </tr>
              <tr>
                <td valign="top">Phòng:</td>
                <td>{thongTinPhim?.tenRap}</td>
              </tr>
              <tr>
                <td valign="top">Ghế:</td>
                <td>{selectedSeatList?.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          <h3 className={classes.infoResult_label}>Thông tin đặt vé</h3>
          <table className={`${classes.table} table`}>
            <tbody>
              <tr>
                <td valign="top">Họ tên:</td>
                <td>{currentUser?.hoTen}</td>
              </tr>
              <tr>
                <td valign="top">Điện thoại:</td>
                <td valign="top">{phone}</td>
              </tr>
              <tr>
                <td valign="top">Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td valign="top">Trạng thái:</td>
                <td>
                  {successBookingTicketMessage && (
                    <span>
                      Đặt vé thành công qua{" "}
                      <span className={classes.paymentColor}>
                        {paymentMethod}
                      </span>
                    </span>
                  )}
                  {errorBookingTicketMessage && (
                    <span>
                      Đặt vé thất bại:{" "}
                      <span className={classes.errorColor}>
                        {errorBookingTicketMessage}
                      </span>
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td valign="top">Tổng tiền:</td>
                <td valign="top">
                  <span>{`${amount.toLocaleString("vi-VI")} đ`}</span>
                </td>
              </tr>
            </tbody>
          </table>
          {successBookingTicketMessage && (
            <p className={classes.noteresult}>
              Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingTicketResult;
