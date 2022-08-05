import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { RESET_DATA_BOOKTICKET } from "../../../redux/constants/BookingTicketConstant";
import { LOADING_BACKTO_HOME } from "../../../redux/constants/LazyConstant";
import { getCinemaInfo } from "../../../redux/actions/BookingTicketAction";
import BookingTicketResult from "../BookingTicketResult/BookingTicketResult";
import useStyles from "./ModalStyle";

const Modal = () => {
  const { timeOut, successBookingTicketMessage, errorBookingTicketMessage } =
    useSelector((state) => state.BookingTicketReducer);
  const dispatch = useDispatch();
  const param = useParams(); // lay du lieu tu URL
  const navigate = useNavigate();
  const classes = useStyles();
  const isBookticket =
    successBookingTicketMessage || errorBookingTicketMessage ? true : false;
  const handleReBooking = () => {
    if (successBookingTicketMessage) {
      dispatch(getCinemaInfo(param.maLichChieu));
    }
    dispatch({ type: RESET_DATA_BOOKTICKET });
  };
  const handleTimeOut = () => {
    dispatch({ type: RESET_DATA_BOOKTICKET });
    dispatch(getCinemaInfo(param.maLichChieu));
  };
  const handleCombackHome = () => {
    dispatch({ type: RESET_DATA_BOOKTICKET });
    dispatch({ type: LOADING_BACKTO_HOME });
    navigate("/");
  };

  return (
    <Dialog
      open={timeOut || isBookticket}
      classes={{ paper: classes.modal }}
      maxWidth="md"
    >
      {timeOut &&
        !isBookticket && ( // không thông báo hết giờ khi đã có kết quả đặt vé
          <div className={classes.padding}>
            <p>
              Đã hết thời gian giữ ghế. Vui lòng thực hiện đơn hàng trong thời
              hạn 5 phút.
              <span className={classes.txtClick} onClick={handleTimeOut}>
                Đặt vé lại
              </span>
            </p>
          </div>
        )}

      {isBookticket && ( // chỉ open modal khi đã đạt vé
        <>
          <BookingTicketResult />
          <div className={classes.spaceEvenly}>
            <Button
              classes={{ root: classes.btnResult }}
              onClick={handleReBooking}
            >
              {successBookingTicketMessage && "Mua thêm vé phim này"}
              {errorBookingTicketMessage && "Thử mua lại"}
            </Button>
            <Button
              classes={{ root: classes.btnResult }}
              onClick={handleCombackHome}
            >
              Quay về trang chủ
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
};

export default Modal;
