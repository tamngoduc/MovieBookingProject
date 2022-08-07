import React from "react";
import clsx from "clsx";
import { Button, ListItem, makeStyles } from "@material-ui/core";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    position: "relative",
    zIndex: 1201,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const NavItem = ({ className, href, icon: Icon, title, ...rest }) => {
  const { isExistUserModified } = useSelector(
    (state) => state.UsersManagementReducer
  );
  const classes = useStyles();
  const navigate = useNavigate();
  let location = useLocation();
  const onChangePageManagement = () => {
    if (
      isExistUserModified &&
      location.pathname === "/admin/users" &&
      href !== "/admin/users"
    ) {
      Swal.fire({
        title: "Dữ liệu đã chỉnh sửa sẽ bị mất khi chuyển trang?",
        text: "Bạn không thể hoàn nguyên!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Chuyển trang!",
        cancelButtonText: "Ở lại!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(href);
        }
      });
    } else {
      navigate(href);
    }
  };
  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        className={clsx(
          classes.button,
          location.pathname === href && classes.active
        )}
        onClick={onChangePageManagement}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
