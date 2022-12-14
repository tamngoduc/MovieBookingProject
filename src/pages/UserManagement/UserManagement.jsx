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
    // get list user l???n ?????u
    if (!usersList) {
      dispatch(getUserList());
    }
    return () => dispatch(resetUserList());
  }, []);
  useEffect(() => {
    // x??a ho???c update th??nh c??ng th?? refresh list user
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
    // dispatch(getUserList()) th??nh c??ng th?? th??m props v??o item ????? hi???n th??? theo y??u c???u DataGrid
    if (usersList?.length) {
      let newUsersListDisplay;
      if (userListmodified.userListmodified.length) {
        // n???u nh???n cancel v?? v???n c??n m???t s??? user ch??a update th?? gi??? l???i data dang ch???nh s???a
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
        })); // id l?? prop b???t bu???c
      }
      setUsersListDisplay(newUsersListDisplay);
    }
  }, [usersList]);

  useEffect(() => {
    // deleteUser xong th?? th??ng b??o
    if (userListDelete.cancel) {
      return;
    }
    if (deleteSuccess) {
      setUserListDelete((data) => ({ ...data, triggerDelete: nanoid(6) })); // k??ch ho???t x??a ti???p user ti???p theo
      enqueueSnackbar(deleteSuccess, { variant: "success" });
      return;
    }
    if (deleteError) {
      setUserListDelete((data) => ({ ...data, triggerDelete: nanoid(6) }));
      enqueueSnackbar(deleteError, { variant: "error" });
    }
  }, [deleteSuccess, deleteError]);

  useEffect(() => {
    // update user xong th?? th??ng b??o
    if (userListmodified.cancel) {
      return;
    }
    if (updateUserSuccess) {
      setUserListmodified((data) => ({ ...data, triggerUpdate: nanoid(6) }));
      enqueueSnackbar("Update th??nh c??ng", { variant: "success" });
      return;
    }
    if (updateUserError) {
      setUserListmodified((data) => ({ ...data, triggerUpdate: nanoid(6) }));
      enqueueSnackbar(updateUserError, { variant: "error" });
    }
  }, [updateUserSuccess, updateUserError]);

  useEffect(() => {
    // add user xong th?? th??ng b??o
    if (addUserSuccess) {
      enqueueSnackbar(
        `???? th??m th??nh c??ng t??i kho???n: ${addUserSuccess.taiKhoan}`,
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
    // ?? t?????ng l?? ti???n h??nh delete t???ng user trong danh s??ch m???i khi ho??n th??nh call api cho ?????n khi h???t user trong danh d??ch
    if (userListDelete.userListDelete.length) {
      // n???u m???ng c??n ph???n t???
      let newUserListDelete = [...userListDelete.userListDelete]; // copy
      const userDelete = newUserListDelete.shift(); // c???t ra, v?? x??a lu??n ph???n t??? ?????u trong m???ng
      setUserListDelete((data) => ({
        ...data,
        userListDelete: newUserListDelete,
      })); // set array
      setSelectionModel(() => newUserListDelete);
      dispatch(deleteUser(userDelete)); // delete
      return;
    }
    if (userListDelete.userListDelete.length === 0) {
      // n???u m???ng h???t ph???n t???
      setUserListDelete({
        triggerDelete: false,
        userListDelete: [],
        cancel: false,
      });
      dispatch(resetUserList());
      setSelectionModel([]);
    }
  }, [userListDelete.triggerDelete]); // ch??? khi ???????c k??ch ho???t th?? m???i th???c hi???n x??a ti???p user, n???u d??ng chung deleteSuccess, deleteError l??m trigger c?? th??? l???i do k???t qu??? c???a useEffect tr??n ph??? thu???c v??o deleteSuccess, deleteError

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
          // n???u email sai th?? tho??t kh??ng l??u
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

  // handleEditCellChangeCommitted th???c thi m???i khi cell change ???????c commit(kh??ng l???i validation)
  // so s??nh v???i gi?? tr??? tr?????c khi ch???nh s???a, n???u kh??c bi???t th?? th??m user v??o danh s??ch chu???n b??? update, n???u kh??ng kh??c bi???t th?? x??a kh???i danh s??ch ho???c kh??ng l??m g??
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
        return; // kh??ng th???c hi???c c??c vi???c b??n d?????i n???u ??ang ??? m??n h??nh addedUser
      }
      const userOriginal = usersList.find((user) => user.taiKhoan === id); // l???y ra ph???n t??? ch??a ???????c ch???nh s???a
      const valueDisplay = value;
      let valueModified = value;
      if (field === "maLoaiNguoiDung") {
        valueModified = value ? "QuanTri" : "KhachHang";
      }
      const isChange = userOriginal[field] === valueModified ? false : true; // li???u c?? thay ?????i
      const indexUserExist = userListmodified.userListmodified.findIndex(
        (user) => user.taiKhoan === id
      ); // user v???a ch???nh c?? ???????c l??u tr?????c ?????
      if (isChange) {
        // n???u c?? kh??c bi???t
        // x??? l?? hi???n th???: set row ???? modify, set l???i value m???i
        const updatedUsersListDisplay = usersListDisplay.map((row) => {
          if (row.id === id) {
            return { ...row, ismodify: true, [field]: valueDisplay };
          }
          return row;
        });
        setUsersListDisplay(updatedUsersListDisplay);
        // x??? l?? userListmodified
        if (indexUserExist !== -1) {
          // n???u ???? t???n t???i user modify
          const newUserListmodified = userListmodified.userListmodified.map(
            (user) => {
              // s???a l???i ph???n kh??c bi???t
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
        })); // n???u ch??a t???n t???i th?? push v??o
        return;
      }
      if (indexUserExist !== -1) {
        // n???u kh??ng kh??c bi???t v?? c?? trong danh s??ch modify
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
        // x??? l?? display
        const updatedUsersListDisplay = usersListDisplay.map((row) => {
          if (row.id === id) {
            return { ...row, ismodify, [field]: valueDisplay };
          }
          return row;
        });
        setUsersListDisplay(updatedUsersListDisplay);

        // n???u ismodify = true th?? c???p nh???t userListmodified
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
        // n???u ismodify = false th?? x??a user kh???i userListmodified
        const newUserListmodified = userListmodified.userListmodified.filter(
          (user) => user.taiKhoan !== id
        ); // x??a ra kh???i m???ng
        setUserListmodified((data) => ({
          ...data,
          userListmodified: newUserListmodified,
        }));
      }
    },
    [usersListDisplay, usersList, userListmodified, addedUser]
  );

  // x??a user
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
  // update nhi???u user
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
      // n???u ch??a ??i???n th?? toggle
      setAddedUser((data) => ({ ...data, toggle: !addedUser.toggle }));
      return;
    }
    if (addedUser.readyAdd && !addUserLoading) {
      // n???u ???? ??i???n v?? ???? s??n s??ng
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
      // c???t t??i kho???n kh??ng ???????c ch???nh s???a, backend d??ng "taiKhoan" ????? ?????nh danh user
      [
        {
          field: "taiKhoan",
          headerName: "T??i Kho???n",
          width: 250,
          editable: addedUser.toggle,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "matKhau",
          headerName: "M???t Kh???u",
          width: 300,
          editable: true,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "hoTen",
          headerName: "H??? t??n",
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
          headerName: "S??? ??i???n tho???i",
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
              {userListDelete.triggerDelete === false ? "x??a" : "ng???ng x??a"}{" "}
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
                ? "c???p nh???t"
                : "h???y c???p nh???t"}{" "}
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
                  ? "th??m user"
                  : "qu???n l?? user"
                : "th??m user"}
            </Button>
          </div>

          <div className="col-12 pt-3 col-sm-6 col-md-4 col-lg-3">
            <div className={`${classes.search} ${classes.button}`}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search???"
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
        // b???t checkbox
        checkboxSelection={!addedUser.toggle}
        disableSelectionOnClick
        // khi click ch???n t???ng ph???n t??? ph???i l??u l???i
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
        // x??? l?? ch???nh s???a
        editRowsModel={editRowsModel}
        onEditCellChange={handleEditCellChange}
        onEditCellChangeCommitted={handleEditCellChangeCommitted}
        // hi???n loading khi ??ang call api l???y userList
        loading={usersListLoading}
      />
    </div>
  );
};

export default UserManagement;
