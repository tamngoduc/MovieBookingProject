import React from "react";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SeatIcon from "@material-ui/icons/CallToActionRounded";
import PaymentIcon from "@material-ui/icons/Payment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStyles, ColorlibConnector } from "./CheckoutStepStyle";

const CheckoutStep = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { activeStep } = useSelector((state) => state.BookingTicketReducer);
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const steps = ["CHỌN GHẾ", "THANH TOÁN", "KẾT QUẢ ĐẶT VÉ"];

  function StepIcon(props) {
    const { active, completed } = props;
    const icons = {
      1: <SeatIcon />,
      2: <PaymentIcon />,
      3: <CheckCircleIcon />,
    };
    return (
      <div
        className={clsx(classes.stepIcon, {
          [classes.stepIconActive]: active,
          [classes.stepIconCompleted]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  const handleUser = () => {
    navigate("/taikhoan");
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className={classes.stepper}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{ label: classes.label }}
              StepIconComponent={StepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.account} onClick={handleUser}>
        <Avatar alt="avatar" className={classes.avatar} />
        <p className={classes.hoTen}>{currentUser.hoTen}</p>
      </div>
    </div>
  );
};

export default CheckoutStep;
