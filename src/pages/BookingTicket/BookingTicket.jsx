import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCinemaInfo } from "../../redux/actions/BookingTicketAction";
import * as actionTypes from "../../redux/constants/BookingTicketConstant";
import BookingDesktop from "./BookingDesktop/BookingDesktop";
import Modal from "./Modal/Modal";

const BookingTicket = () => {
  const {
    cinemaInfo: { thongTinPhim, danhSachGhe },
    cinemaInfoError,
    cinemaInfoLoading,
    timeOut,
  } = useSelector((state) => state.BookingTicketReducer);
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const { isLazy } = useSelector((state) => state.LazyReducer);
  const params = useParams();
  const dispatch = useDispatch();
  const loading = isLazy || cinemaInfoLoading;

  useEffect(() => {
    // lấy thongTinPhim và danhSachGhe
    dispatch(getCinemaInfo(params.maLichChieu));
    return () => {
      // xóa dữ liệu khi đóng hủy component
      dispatch({ type: actionTypes.RESET_DATA_BOOKTICKET });
    };
  }, []);
  useEffect(() => {
    // sau khi lấy được danhSachPhongVe thì khởi tạo data
    let initCode = 64;
    const editSeatList = danhSachGhe?.map((seat, i) => {
      // thêm label A01, thêm flag selected: false
      if (i % 16 === 0) initCode++;
      const txt = String.fromCharCode(initCode);
      const number = ((i % 16) + 1).toString().padStart(2, 0);
      return { ...seat, label: txt + number, selected: false };
    });
    dispatch({
      type: actionTypes.INIT_DATA,
      data: {
        seatList: editSeatList,
        showtimeID: thongTinPhim?.maLichChieu,
        userAccount: currentUser?.taiKhoan,
        email: currentUser?.email,
        phone: currentUser?.soDT,
      },
    });
  }, [danhSachGhe, currentUser, timeOut]);

  if (cinemaInfoError) {
    return <div>{cinemaInfoError}</div>;
  }
  return (
    <div style={{ display: loading ? "none" : "block" }}>
      <BookingDesktop />
      <Modal />
    </div>
  );
};

export default BookingTicket;
