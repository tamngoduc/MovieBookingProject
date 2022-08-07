import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../redux/constants/AuthConstant";
import { LOADING_BACKTO_HOME } from "../../redux/constants/LazyConstant";

const TopBar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogo = () => {
    dispatch({ type: LOADING_BACKTO_HOME });
    setTimeout(() => {
      navigate("/");
    }, 50);
  };

  return (
    // Header
    <AppBar elevation={0} position="static" {...rest}>
      <Toolbar>
        <div onClick={handleClickLogo} style={{ cursor: "pointer" }}>
          <img src="/img/headTixLogo.png" alt="logo" style={{ height: 50 }} />
        </div>

        <Box flexGrow={1} />

        {/* Notification and Logout */}
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Đăng xuất">
            <IconButton
              color="inherit"
              onClick={() => dispatch({ type: LOGOUT })}
            >
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>

        {/* Menu icon */}
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
