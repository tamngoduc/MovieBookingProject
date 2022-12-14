import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import formatDate from "../../../tools/formatDate";
import { bookTicket } from "../../../redux/actions/BookingTicketAction";
import {
  SET_DATA_PAYMENT,
  SET_READY_PAYMENT,
} from "../../../redux/constants/BookingTicketConstant";
import useStyles from "./PaymentStyle";

const makeObjError = (name, value, dataSubmit) => {
  // kiểm tra và set lỗi rỗng
  let newErrors = {
    ...dataSubmit.errors,
    [name]:
      value?.trim() === ""
        ? `${name.charAt(0).toUpperCase() + name.slice(1)} không được bỏ trống`
        : "",
  };

  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //eslint-disable-next-line
  const regexNumber =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
  if (name === "email" && value) {
    if (!regexEmail.test(value)) {
      newErrors[name] = "Email không đúng định dạng";
    }
  }
  if (name === "phone" && value) {
    if (!regexNumber.test(value)) {
      newErrors[name] = "Phone không đúng định dạng";
    }
  }
  return newErrors;
};

const Payment = () => {
  const {
    seatList,
    amount,
    email,
    phone,
    paymentMethod,
    isReadyPayment,
    ticketList,
    cinemaInfo: { thongTinPhim },
    showtimeID,
    userAccount,
    isSelectedSeat,
    selectedSeatList,
    bookingTicketLoading,
    successBookingTicketMessage,
    errorBookingTicketMessage,
  } = useSelector((state) => state.BookingTicketReducer);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const phoneRef = useRef();
  const [dataFocus, setDataFocus] = useState({ phone: false, email: false });
  const [dataSubmit, setdataSubmit] = useState({
    values: {
      email: email,
      phone: phone,
      paymentMethod: paymentMethod,
    },
    errors: {
      email: "",
      phone: "",
    },
  });
  const classes = useStyles({
    isSelectedSeat,
    isReadyPayment,
    dataFocus,
    dataSubmit,
  });

  const onChange = (e) => {
    // khi onchange update values và validation
    let { name, value } = e.target;
    let newValues = { ...dataSubmit.values, [name]: value };
    let newErrors = makeObjError(name, value, dataSubmit);
    setdataSubmit((dataSubmit) => ({
      ...dataSubmit,
      values: newValues,
      errors: newErrors,
    }));
  };

  useEffect(() => {
    dispatch({
      type: SET_DATA_PAYMENT,
      data: {
        email: dataSubmit.values.email,
        phone: dataSubmit.values.phone,
        paymentMethod: dataSubmit.values.paymentMethod,
      },
    });
    // khi không có lỗi và đủ dữ liệu thì set data sẵn sàng đặt vé và ngược lại, set activeStep = 1 nếu đủ dữ liệu và chưa đặt vé
    if (
      !dataSubmit.errors.email &&
      !dataSubmit.errors.phone &&
      dataSubmit.values.email &&
      dataSubmit.values.phone &&
      dataSubmit.values.paymentMethod &&
      isSelectedSeat
    ) {
      dispatch({
        type: SET_READY_PAYMENT,
        data: { isReadyPayment: true },
      });
    } else {
      dispatch({
        type: SET_READY_PAYMENT,
        data: { isReadyPayment: false },
      });
    }
  }, [dataSubmit, isSelectedSeat]);

  useEffect(() => {
    // cập nhật lại data email, phone và validation khi reload
    let emailErrors = makeObjError(emailRef.current.name, email, dataSubmit);
    let phoneErrors = makeObjError(phoneRef.current.name, phone, dataSubmit);
    setdataSubmit((dataSubmit) => ({
      ...dataSubmit,
      values: {
        email: email,
        phone: phone,
        paymentMethod: paymentMethod,
      },
      errors: { email: emailErrors.email, phone: phoneErrors.phone },
    }));
  }, [seatList]); // khi reload seatList sẽ được cập nhật kèm theo, email, phone mặc định của tài khoản

  const handleBookTicket = () => {
    // khi đủ dữ liệu và chưa có lần đặt vé nào trước đó thì mới cho đặt vé
    if (
      isReadyPayment &&
      !bookingTicketLoading &&
      !successBookingTicketMessage &&
      !errorBookingTicketMessage
    ) {
      dispatch(bookTicket({ showtimeID, ticketList, userAccount }));
      // dispatch(bookTicket({ showtimeID: 40396, ticketList: [{ maGhe: 9122569, giaVe: 75000 }], userAccount }))
    }
  };
  const onFocus = (e) => {
    setDataFocus({ ...dataFocus, [e.target.name]: true });
  };
  const onBlur = (e) => {
    setDataFocus({ ...dataFocus, [e.target.name]: false });
  };

  return (
    <div className={classes.payMent}>
      <div>
        {/* tổng tiền */}
        <p className={`${classes.amount} ${classes.payMentItem}`}>
          {`${amount.toLocaleString("vi-VI")} đ`}
        </p>

        {/* thông tin phim và rạp */}
        <div className={classes.payMentItem}>
          <p className={classes.tenPhim}>{thongTinPhim?.tenPhim}</p>
          <p>{thongTinPhim?.tenCumRap}</p>
          <p>{`${thongTinPhim && formatDate(thongTinPhim.ngayChieu).dayToday} ${
            thongTinPhim?.ngayChieu
          } - ${thongTinPhim?.gioChieu} - ${thongTinPhim?.tenRap}`}</p>
        </div>

        {/* ghế đã chọn */}
        <div className={`${classes.seatInfo} ${classes.payMentItem}`}>
          <span>{`Ghế ${selectedSeatList?.join(", ")}`}</span>
          <p className={classes.amountLittle}>
            {`${amount.toLocaleString("vi-VI")} đ`}
          </p>
        </div>

        {/* email */}
        <div className={classes.payMentItem}>
          <label className={classes.labelEmail}>E-Mail</label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            onFocus={onFocus}
            onBlur={onBlur}
            value={dataSubmit.values.email}
            className={classes.fillInEmail}
            onChange={onChange}
            autoComplete="off"
          />
          <p className={classes.error}>{dataSubmit.errors.email}</p>
        </div>

        {/* phone */}
        <div className={classes.payMentItem}>
          <label className={classes.labelPhone}>Phone</label>
          <input
            type="number"
            name="phone"
            ref={phoneRef}
            onFocus={onFocus}
            onBlur={onBlur}
            value={dataSubmit.values.phone}
            className={classes.fillInPhone}
            onChange={onChange}
            autoComplete="off"
          />
          <p className={classes.error}>{dataSubmit.errors.phone}</p>
        </div>

        {/* hình thức thanh toán */}
        <div className={classes.selectedPayMentMethod}>
          <label className={classes.label}>Hình thức thanh toán</label>
          <p className={classes.toggleNotice}>
            Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.
          </p>

          <div className={classes.formPayment}>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="ZaloPay"
                onChange={onChange}
                checked={dataSubmit.values.paymentMethod === "ZaloPay"}
              />
              <img
                className={classes.img}
                src="/img/bookticket/zalo.jpg"
                alt="zalopay"
              />
              <label>Thanh toán qua ZaloPay</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="Visa, Master, JCB"
                onChange={onChange}
                checked={
                  dataSubmit.values.paymentMethod === "Visa, Master, JCB"
                }
              />
              <img
                className={classes.img}
                src="/img/bookticket/visa.png"
                alt="visa"
              />
              <label>Visa, Master, JCB</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="ATM nội địa"
                onChange={onChange}
                checked={dataSubmit.values.paymentMethod === "ATM nội địa"}
              />
              <img
                className={classes.img}
                src="/img/bookticket/atm.png"
                alt="atm"
              />
              <label>Thẻ ATM nội địa</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="Cửa hàng tiện ích"
                onChange={onChange}
                checked={
                  dataSubmit.values.paymentMethod === "Cửa hàng tiện ích"
                }
              />
              <img
                className={classes.img}
                src="/img/bookticket/cuahang.png"
                alt="cuahang"
              />
              <label>Thanh toán tại cửa hàng tiện ích</label>
            </div>
          </div>
        </div>

        {/* đặt vé */}
        <div className={classes.bottomSection}>
          <button
            className={classes.btnDatVe}
            disabled={!isReadyPayment}
            onClick={handleBookTicket}
          >
            <p className={classes.txtDatVe}>Đặt Vé</p>
          </button>
        </div>
      </div>

      {/* notice */}
      <div className={classes.notice}>
        <img
          className={classes.imgNotice}
          src="/img/bookticket/exclamation.png"
          alt="notice"
        />
        <span>Vé đã mua không thể đổi hoặc hoàn tiền</span>
        <p>
          Mã vé sẽ được gửi qua tin nhắn{" "}
          <span className={classes.contactColor}>ZMS</span> (tin nhắn Zalo) và{" "}
          <span className={classes.contactColor}>Email</span> đã nhập.
        </p>
      </div>
    </div>
  );
};

export default Payment;
