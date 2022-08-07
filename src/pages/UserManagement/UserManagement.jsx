import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";

import { DataGrid } from "@material-ui/data-grid";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useSnackbar } from "notistack";
// import ButtonDelete from "./ButtonDelete";
import CachedIcon from "@material-ui/icons/Cached";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import EditIcon from "@material-ui/icons/Edit";
import slugify from "slugify";
import {
  deleteUser,
  getUserList,
  resetUserList,
  updateUser,
  addUser,
  setStatusIsExistUserModified,
} from "../../redux/actions/UserManagementAction";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import useStyles from "./UserManagementStyle";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const UserManagement = () => {
  const [editRowsModel, setEditRowsModel] = useState({});
  const classes = useStyles();
  const [usersListDisplay, setUsersListDisplay] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectionModel, setSelectionModel] = useState([]);
  const [userListDelete, setUserListDelete] = useState({
    triggerDelete: false,
    userListDelete: [],
    cancel: false,
  });
  const [userListmodified, setUserListmodified] = useState({
    triggerUpdate: false,
    userListmodified: [],
    cancel: false,
  });
  const {
    usersList,
    usersListLoading,
    userListError,
    deleteSuccess,
    deleteError,
    deleteLoading,
    updateUserSuccess,
    updateUserError,
    addUserLoading,
    addUserSuccess,
    addUserError,
  } = useSelector((state) => state.UsersManagementReducer);
  const dispatch = useDispatch();
  const [btnReFresh, setBtnReFresh] = useState("");
  const [sortBy, setsortBy] = useState({ field: "taiKhoan", sort: "asc" });
  const [valueSearch, setValueSearch] = useState("");
  const clearSetSearch = useRef(0);
  const [addedUser, setAddedUser] = useState({
    data: [
      {
        id: nanoid(6),
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        email: "",
        soDt: "",
        maLoaiNguoiDung: false,
      },
    ],
    toggle: false,
    readyAdd: false,
    isFilledIn: false,
  });

  useEffect(() => {
    // get list user lần đầu
    if (!usersList) {
      dispatch(getUserList());
    }
    return () => dispatch(resetUserList());
  }, []);
  useEffect(() => {
    // xóa hoặc update thành công thì refresh list user
    if (deleteSuccess || updateUserSuccess || btnReFresh || addUserSuccess) {
      dispatch(getUserList());
    }
  }, [deleteSuccess, updateUserSuccess, btnReFresh, addUserSuccess]);
  useEffect(() => {
    if (userListmodified.userListmodified.length || addedUser.isFilledIn) {
      dispatch(setStatusIsExistUserModified(true));
    } else {
      dispatch(setStatusIsExistUserModified(false));
    }
  }, [userListmodified.userListmodified, addedUser.isFilledIn]);

  useEffect(() => {
    // dispatch(getUserList()) thành công thì thêm props vào item để hiển thị theo yêu cầu DataGrid
    if (usersList?.length) {
      let newUsersListDisplay;
      if (userListmodified.userListmodified.length) {
        // nếu nhấn cancel và vẫn còn một số user chưa update thì giữ lại data dang chỉnh sửa
        const userListmodifiedRest = userListmodified.userListmodified;
        newUsersListDisplay = usersList.map(function (userNew) {
          let userModified = this.find(
            (user) => user.taiKhoan === userNew.taiKhoan
          );
          if (userModified) {
            userModified = { ...userModified };
            delete userModified.maNhom;
            return {
              ...userModified,
              id: userModified.taiKhoan,
              xoa: "",
              maLoaiNguoiDung:
                userModified.maLoaiNguoiDung === "QuanTri" ? true : false,
              ismodify: true,
            };
          }
          return {
            ...userNew,
            xoa: "",
            id: userNew.taiKhoan,
            maLoaiNguoiDung:
              userNew.maLoaiNguoiDung === "QuanTri" ? true : false,
            ismodify: false,
          };
        }, userListmodifiedRest);
      } else {
        newUsersListDisplay = usersList.map((user, i) => ({
          ...user,
          xoa: "",
          id: user.taiKhoan,
          maLoaiNguoiDung: user.maLoaiNguoiDung === "QuanTri" ? true : false,
          ismodify: false,
        })); // id là prop bắt buộc
      }
      setUsersListDisplay(newUsersListDisplay);
    }
  }, [usersList]);

  useEffect(() => {
    // deleteUser xong thì thông báo
    if (userListDelete.cancel) {
      return;
    }
    if (deleteSuccess) {
      setUserListDelete((data) => ({ ...data, triggerDelete: nanoid(6) })); // kích hoạt xóa tiếp user tiếp theo
      enqueueSnackbar(deleteSuccess, { variant: "success" });
      return;
    }
    if (deleteError) {
      setUserListDelete((data) => ({ ...data, triggerDelete: nanoid(6) }));
      enqueueSnackbar(deleteError, { variant: "error" });
    }
  }, [deleteSuccess, deleteError]);

  useEffect(() => {
    // update user xong thì thông báo
    if (userListmodified.cancel) {
      return;
    }
    if (updateUserSuccess) {
      setUserListmodified((data) => ({ ...data, triggerUpdate: nanoid(6) }));
      enqueueSnackbar("Update thành công", { variant: "success" });
      return;
    }
    if (updateUserError) {
      setUserListmodified((data) => ({ ...data, triggerUpdate: nanoid(6) }));
      enqueueSnackbar(updateUserError, { variant: "error" });
    }
  }, [updateUserSuccess, updateUserError]);

  useEffect(() => {
    // add user xong thì thông báo
    if (addUserSuccess) {
      enqueueSnackbar(
        `Đã thêm thành công tài khoản: ${addUserSuccess.taiKhoan}`,
        { variant: "success" }
      );
    }
    if (addUserError) {
      enqueueSnackbar(addUserError, { variant: "error" });
    }
    setAddedUser({
      data: [
        {
          id: nanoid(6),
          taiKhoan: "",
          matKhau: "",
          hoTen: "",
          email: "",
          soDt: "",
          maLoaiNguoiDung: false,
        },
      ],
      toggle: false,
      readyAdd: false,
      isFilledIn: false,
    });
  }, [addUserSuccess, addUserError]);

  useEffect(() => {
    // ý tưởng là tiến hành delete từng user trong danh sách mỗi khi hoàn thành call api cho đến khi hết user trong danh dách
    if (userListDelete.userListDelete.length) {
      // nếu mảng còn phần tử
      let newUserListDelete = [...userListDelete.userListDelete]; // copy
      const userDelete = newUserListDelete.shift(); // cắt ra, và xóa luôn phần tử đầu trong mảng
      setUserListDelete((data) => ({
        ...data,
        userListDelete: newUserListDelete,
      })); // set array
      setSelectionModel(() => newUserListDelete);
      dispatch(deleteUser(userDelete)); // delete
      return;
    }
    if (userListDelete.userListDelete.length === 0) {
      // nếu mảng hết phần tử
      setUserListDelete({
        triggerDelete: false,
        userListDelete: [],
        cancel: false,
      });
      dispatch(resetUserList());
      setSelectionModel([]);
    }
  }, [userListDelete.triggerDelete]); // chỉ khi được kích hoạt thì mới thực hiện xóa tiếp user, nếu dùng chung deleteSuccess, deleteError làm trigger có thể lỗi do kết quả của useEffect trên phụ thuộc vào deleteSuccess, deleteError

  useEffect(() => {
    if (userListmodified.userListmodified.length) {
      let newUserListmodified = [...userListmodified.userListmodified];
      const userUpdate = newUserListmodified.shift();
      setUserListmodified((data) => ({
        ...data,
        userListmodified: newUserListmodified,
      }));
      dispatch(updateUser(userUpdate));
      return;
    }
    if (userListmodified.userListmodified.length === 0) {
      setUserListmodified({
        triggerUpdate: false,
        userListmodified: [],
        cancel: false,
      });
      dispatch(resetUserList());
    }
  }, [userListmodified.triggerUpdate]);

  const handleEditCellChange = useCallback(
    ({ id, field, props }) => {
      if (field === "email") {
        const data = props; // Fix eslint value is missing in prop-types for JS files
        const isValid = validateEmail(data.value);
        const newState = {};
        newState[id] = {
          ...editRowsModel[id],
          email: { ...props, error: !isValid },
        };
        setEditRowsModel((state) => ({ ...state, ...newState }));
        if (!validateEmail(props.value)) {
          // nếu email sai thì thoát không lưu
          return;
        }
      }
      if (addedUser.toggle) {
        setAddedUser((data) => ({
          ...data,
          data: [{ ...data.data[0], [field]: props.value }],
        }));
      }
    },
    [editRowsModel, addedUser.toggle]
  );

  // handleEditCellChangeCommitted thực thi mỗi khi cell change được commit(không lỗi validation)
  // so sánh với giá trị trước khi chỉnh sửa, nếu khác biệt thì thêm user vào danh sách chuẩn bị update, nếu không khác biệt thì xóa khỏi danh sách hoặc không làm gì
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, props: { value } }) => {
      if (addedUser.toggle) {
        const isFilledIn =
          addedUser.data[0].taiKhoan !== "" ||
          addedUser.data[0].matKhau !== "" ||
          addedUser.data[0].hoTen !== "" ||
          addedUser.data[0].email !== "" ||
          addedUser.data[0].soDt !== "" ||
          addedUser.data[0].maLoaiNguoiDung === true;
        const readyAdd =
          addedUser.data[0].taiKhoan !== "" &&
          addedUser.data[0].matKhau !== "" &&
          addedUser.data[0].hoTen !== "" &&
          addedUser.data[0].email !== "" &&
          addedUser.data[0].soDt !== "";
        setAddedUser((data) => ({ ...data, readyAdd, isFilledIn }));
        return; // không thực hiệc các việc bên dưới nếu đang ở màn hình addedUser
      }
      const userOriginal = usersList.find((user) => user.taiKhoan === id); // lấy ra phần tử chưa được chỉnh sửa
      const valueDisplay = value;
      let valueModified = value;
      if (field === "maLoaiNguoiDung") {
        valueModified = value ? "QuanTri" : "KhachHang";
      }
      const isChange = userOriginal[field] === valueModified ? false : true; // liệu có thay đổi
      const indexUserExist = userListmodified.userListmodified.findIndex(
        (user) => user.taiKhoan === id
      ); // user vừa chỉnh có được lưu trước đó?
      if (isChange) {
        // nếu có khác biệt
        // xử lý hiển thị: set row đã modify, set lại value mới
        const updatedUsersListDisplay = usersListDisplay.map((row) => {
          if (row.id === id) {
            return { ...row, ismodify: true, [field]: valueDisplay };
          }
          return row;
        });
        setUsersListDisplay(updatedUsersListDisplay);
        // xử lý userListmodified
        if (indexUserExist !== -1) {
          // nếu đã tồn tại user modify
          const newUserListmodified = userListmodified.userListmodified.map(
            (user) => {
              // sửa lại phần khác biệt
              if (user.taiKhoan === id) {
                return { ...user, [field]: valueModified };
              }
              return user;
            }
          );
          setUserListmodified((data) => ({
            ...data,
            userListmodified: newUserListmodified,
          }));
          return;
        }
        setUserListmodified((data) => ({
          ...data,
          userListmodified: [
            ...userListmodified.userListmodified,
            { ...userOriginal, [field]: valueModified, maNhom: "GP09" },
          ],
        })); // nếu chưa tồn tại thì push vào
        return;
      }
      if (indexUserExist !== -1) {
        // nếu không khác biệt và có trong danh sách modify
        let userModified = userListmodified.userListmodified[indexUserExist];
        userModified = { ...userModified, [field]: valueModified };
        const isMatKhauChange = userModified.matKhau !== userOriginal.matKhau;
        const isEmailChange = userModified.email !== userOriginal.email;
        const isSoDtChange = userModified.soDt !== userOriginal.soDt;
        const isMaLoaiNguoiDungChange =
          userModified.maLoaiNguoiDung !== userOriginal.maLoaiNguoiDung;
        const isHoTenChange = userModified.hoTen !== userOriginal.hoTen;
        const ismodify =
          isMatKhauChange ||
          isEmailChange ||
          isSoDtChange ||
          isMaLoaiNguoiDungChange ||
          isHoTenChange;
        // xử lý display
        const updatedUsersListDisplay = usersListDisplay.map((row) => {
          if (row.id === id) {
            return { ...row, ismodify, [field]: valueDisplay };
          }
          return row;
        });
        setUsersListDisplay(updatedUsersListDisplay);

        // nếu ismodify = true thì cập nhật userListmodified
        if (ismodify) {
          const newUserListmodified = userListmodified.userListmodified.map(
            (user) => {
              if (user.taiKhoan === id) {
                return { ...userModified };
              }
              return user;
            }
          );
          setUserListmodified((data) => ({
            ...data,
            userListmodified: newUserListmodified,
          }));
          return;
        }
        // nếu ismodify = false thì xóa user khỏi userListmodified
        const newUserListmodified = userListmodified.userListmodified.filter(
          (user) => user.taiKhoan !== id
        ); // xóa ra khỏi mảng
        setUserListmodified((data) => ({
          ...data,
          userListmodified: newUserListmodified,
        }));
      }
    },
    [usersListDisplay, usersList, userListmodified, addedUser]
  );

  // xóa user
  const handleDeleteMultiple = () => {
    if (userListDelete.triggerDelete !== false) {
      setUserListDelete((data) => ({
        ...data,
        cancel: true,
        triggerDelete: false,
      }));
      return;
    }
    setUserListDelete((data) => ({
      ...data,
      triggerDelete: nanoid(6),
      cancel: false,
    }));
  };
  // update nhiều user
  const handleUpdateMultiple = () => {
    if (userListmodified.triggerUpdate !== false) {
      setUserListmodified((data) => ({
        ...data,
        cancel: true,
        triggerUpdate: false,
      }));
      return;
    }
    setUserListmodified((data) => ({
      ...data,
      triggerUpdate: nanoid(6),
      cancel: false,
    }));
  };

  const handleInputSearchChange = (props) => {
    clearTimeout(clearSetSearch.current);
    clearSetSearch.current = setTimeout(() => {
      setValueSearch(props);
    }, 500);
  };

  const handleToggleAddUser = () => {
    if (!addedUser.isFilledIn) {
      // nếu chưa điền thì toggle
      setAddedUser((data) => ({ ...data, toggle: !addedUser.toggle }));
      return;
    }
    if (addedUser.readyAdd && !addUserLoading) {
      // nếu đã điền và đã sãn sàng
      const userAdd = { ...addedUser.data[0] };
      delete userAdd.id;
      dispatch(
        addUser({
          ...addedUser.data[0],
          maLoaiNguoiDung: userAdd.maLoaiNguoiDung ? "QuanTri" : "KhachHang",
          maNhom: "GP01",
        })
      );
    }
  };

  const onFilter = () => {
    const searchUsersListDisplay = usersListDisplay.filter((user) => {
      const matchTaiKhoan =
        slugify(user.taiKhoan ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchMatKhau =
        slugify(user.matKhau ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchEmail =
        slugify(user.email ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchSoDt =
        slugify(user.soDt ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchHoTen =
        slugify(user.hoTen ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      return (
        matchTaiKhoan || matchMatKhau || matchEmail || matchSoDt || matchHoTen
      );
    });
    return searchUsersListDisplay;
  };

  const sortModel = useMemo(() => {
    return [
      {
        field: sortBy.field,
        sort: sortBy.sort,
      },
    ];
  }, [sortBy]);

  const columns = useMemo(
    () =>
      // cột tài khoản không được chỉnh sửa, backend dùng "taiKhoan" để định danh user
      [
        {
          field: "taiKhoan",
          headerName: "Tài Khoản",
          width: 250,
          editable: addedUser.toggle,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "matKhau",
          headerName: "Mật Khẩu",
          width: 300,
          editable: true,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "hoTen",
          headerName: "Họ tên",
          width: 300,
          editable: true,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "email",
          headerName: "Email",
          width: 300,
          editable: true,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "soDt",
          headerName: "Số điện thoại",
          width: 200,
          editable: true,
          type: "number",
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "maLoaiNguoiDung",
          headerName: "isAdmin",
          width: 145,
          editable: true,
          type: "boolean",
          headerAlign: "center",
          align: "center",
          headerClassName: "custom-header",
        },
        {
          field: "ismodify",
          width: 0,
          type: "boolean",
          headerClassName: "custom-header",
          hide: true,
        },
      ],
    [addedUser.toggle]
  );

  const modifySlugify = { lower: true, locale: "vi" };

  if (userListError) {
    return <h1>{userListError}</h1>;
  }

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <div className="container-fluid pb-3">
        <div className="row">
          <div className="col-12 pt-3 col-sm-6 col-md-4 col-lg-3">
            <Button
              variant="contained"
              color="secondary"
              disabled={userListDelete.userListDelete.length ? false : true}
              className={classes.button}
              startIcon={
                userListDelete.triggerDelete === false ? (
                  <DeleteIcon />
                ) : (
                  <CircularProgress size={20} color="inherit" />
                )
              }
              onClick={handleDeleteMultiple}
            >
              {userListDelete.triggerDelete === false ? "xóa" : "ngừng xóa"}{" "}
              {userListDelete.userListDelete.length} user
            </Button>
          </div>
          <div className="col-12 pt-3 col-sm-6 col-md-4 col-lg-3">
            <Button
              variant="contained"
              color="primary"
              disabled={userListmodified.userListmodified.length ? false : true}
              className={classes.button}
              onClick={handleUpdateMultiple}
              startIcon={
                userListmodified.triggerUpdate === false ? (
                  <CloudUploadIcon />
                ) : (
                  <CircularProgress size={20} color="inherit" />
                )
              }
            >
              {userListmodified.triggerUpdate === false
                ? "cập nhật"
                : "hủy cập nhật"}{" "}
              {userListmodified.userListmodified.length} user
            </Button>
          </div>

          <div className="col-12 pt-3 col-sm-6 col-md-4 col-lg-3">
            <Button
              variant="contained"
              color="primary"
              className={`${classes.addedUser} ${classes.button}`}
              onClick={handleToggleAddUser}
              disabled={
                addedUser.toggle
                  ? addedUser.isFilledIn
                    ? addedUser.readyAdd
                      ? false
                      : true
                    : false
                  : false
              }
              startIcon={
                addedUser.toggle ? (
                  addedUser.isFilledIn ? (
                    <PersonAddIcon />
                  ) : (
                    <EditIcon />
                  )
                ) : (
                  <PersonAddIcon />
                )
              }
            >
              {addedUser.toggle
                ? addedUser.isFilledIn
                  ? "thêm user"
                  : "quản lý user"
                : "thêm user"}
            </Button>
          </div>

          <div className="col-12 pt-3 col-sm-6 col-md-4 col-lg-3">
            <div className={`${classes.search} ${classes.button}`}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(evt) => handleInputSearchChange(evt.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <DataGrid
        className={classes.rootDataGrid}
        rows={addedUser.toggle ? addedUser.data : onFilter()}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25, 50, 100]}
        // bật checkbox
        checkboxSelection={!addedUser.toggle}
        disableSelectionOnClick
        // khi click chọn từng phần tử phải lưu lại
        onSelectionModelChange={(newSelection) => {
          if (newSelection.selectionModel.length === 0) {
            setUserListDelete({
              triggerDelete: false,
              userListDelete: [],
              cancel: false,
            });
          }
          setUserListDelete((data) => ({
            ...data,
            userListDelete: newSelection.selectionModel,
          }));
          setSelectionModel(newSelection.selectionModel);
        }}
        selectionModel={selectionModel}
        // xử lý chỉnh sửa
        editRowsModel={editRowsModel}
        onEditCellChange={handleEditCellChange}
        onEditCellChangeCommitted={handleEditCellChangeCommitted}
        // hiện loading khi đang call api lấy userList
        loading={usersListLoading}
      />
    </div>
  );
};

export default UserManagement;
