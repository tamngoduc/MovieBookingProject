import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import Swal from "sweetalert2";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import { useNavigate } from "react-router-dom";
import {
  getAccountInfo,
  updateUser,
  resetUserList,
} from "../../redux/actions/UserManagementAction";

const useStyles = makeStyles((theme) => ({
  field: {
    maxWidth: 500,
    paddingRight: 16,
    paddingLeft: 16,
  },
  password: {
    position: "relative",
  },
  eye: {
    position: "absolute",
    top: 31,
    right: 9,
    cursor: "pointer",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const UserProfile = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    userInfoSuccess,
    userInfoLoading,
    updateUserSuccess,
    updateUserError,
    updateUserLoading,
  } = useSelector((state) => state.UsersManagementReducer);
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const [typePassword, settypePassword] = useState("password");

  useEffect(() => {
    dispatch(getAccountInfo({ taiKhoan: currentUser?.taiKhoan }));
    return () => dispatch(resetUserList());
  }, []);

  useEffect(() => {
    if (updateUserSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [updateUserSuccess]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const updateUserSchema = yup.object().shape({
    taiKhoan: yup.string().required("*Tài khoản không được bỏ trống !"),
    matKhau: yup.string().required("*Mật khẩu không được bỏ trống !"),
    email: yup
      .string()
      .required("*Email không được bỏ trống !")
      .email("* Email không hợp lệ "),
    soDt: yup
      .string()
      .required("*Số điện thoại không được bỏ trống !")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
    hoTen: yup.string().required("*Tên không được bỏ trống !"),
  });

  const handleSubmit = (user) => {
    if (updateUserLoading) {
      return;
    }
    dispatch(updateUser(user));
  };
  const handleToggleHidePassword = () => {
    if (typePassword === "password") {
      settypePassword("text");
    } else {
      settypePassword("password");
    }
  };

  return (
    <div className="bootstrap snippet mt-5 mb-4">
      <br />
      <div className="row mt-10">
        <div className="col-sm-3">
          <div className="text-center">
            <h1 className="my-2">{userInfoSuccess?.taiKhoan}</h1>
          </div>
          {currentUser.maLoaiNguoiDung === "QuanTri" && (
            <div className="text-center mb-2">
              <Fab
                variant="extended"
                color="primary"
                onClick={() => navigate("/admin/users")}
              >
                <NavigationIcon className={classes.extendedIcon} />
                Tới trang quản trị
              </Fab>
            </div>
          )}
        </div>
        <div className={`col-sm-9 py-3 px-0`}>
          <Formik
            initialValues={{
              taiKhoan: userInfoSuccess?.taiKhoan ?? "",
              matKhau: userInfoSuccess?.matKhau ?? "",
              email: userInfoSuccess?.email ?? "",
              soDt: userInfoSuccess?.soDT ?? "",
              maNhom: "GP09",
              maLoaiNguoiDung: "KhachHang",
              hoTen: userInfoSuccess?.hoTen ?? "",
            }}
            enableReinitialize // cho phép cập nhật giá trị initialValues
            validationSchema={updateUserSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form className={`${classes.field}`}>
                <div className="form-group">
                  <label>Tài khoản&nbsp;</label>
                  <ErrorMessage
                    name="taiKhoan"
                    render={(msg) => <span className="text-danger">{msg}</span>}
                  />
                  <Field
                    disabled
                    name="taiKhoan"
                    type="text"
                    className="form-control"
                    onChange={props.handleChange}
                  />
                </div>
                <div className={`form-group ${classes.password}`}>
                  <label>Mật khẩu&nbsp;</label>
                  <ErrorMessage
                    name="matKhau"
                    render={(msg) => <span className="text-danger">{msg}</span>}
                  />
                  <Field
                    name="matKhau"
                    type={typePassword}
                    className="form-control"
                    onChange={props.handleChange}
                  />
                  <div
                    className={classes.eye}
                    onClick={handleToggleHidePassword}
                  >
                    {typePassword !== "password" ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Họ và tên&nbsp;</label>
                  <ErrorMessage
                    name="hoTen"
                    render={(msg) => <span className="text-danger">{msg}</span>}
                  />
                  <Field
                    name="hoTen"
                    type="text"
                    className="form-control"
                    onChange={props.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email&nbsp;</label>
                  <ErrorMessage
                    name="email"
                    render={(msg) => <span className="text-danger">{msg}</span>}
                  />
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    onChange={props.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại&nbsp;</label>
                  <ErrorMessage
                    name="soDt"
                    render={(msg) => <span className="text-danger">{msg}</span>}
                  />
                  <Field
                    name="soDt"
                    type="text"
                    className="form-control"
                    onChange={props.handleChange}
                  />
                </div>
                <div className="text-left">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disable={updateUserLoading.toString()}
                  >
                    Cập nhật
                  </button>
                  {updateUserError && (
                    <div className="alert alert-danger">
                      <span>{updateUserError}</span>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
          {/* </TabPanel> */}
        </div>
      </div>
      {userInfoLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            backgroundColor: "rgb(255 255 255 / 67%)",
            zIndex: 1000,
          }}
        >
          <CircularProgress style={{ margin: "auto" }} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
