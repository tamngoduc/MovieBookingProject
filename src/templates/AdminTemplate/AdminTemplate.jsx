import React, { useState } from "react";

import { SnackbarProvider } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

export default function AdminLayout() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const { currentUser } = useSelector((state) => state.authReducer);
  if (currentUser?.maLoaiNguoiDung !== "QuanTri") {
    // nếu không phải tài khoản quản trị thì ẩn đi giao diện AdminLayout, vẫn truyền vào children để hiện thông báo trong children
    return <Outlet />;
  }
  return (
    // package notistack: popup thông báo nhỏ gọn
    <SnackbarProvider maxSnack={3}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <div className="row">
        <div style={{ width: 255 }}>
          <NavBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
        </div>
        <div style={{ width: isMobile ? "100%" : "calc(100% - 255px)" }}>
          <Outlet />
        </div>
      </div>
    </SnackbarProvider>
  );
}
