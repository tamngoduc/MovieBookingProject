import axiosClient from "./axiosClient";
import { GROUPID } from "../util/config";

const userAPI = {
  register: (user) => {
    return axiosClient.post("QuanLyNguoiDung/DangKy", user);
  },

  login: (user) => {
    return axiosClient.post("/QuanLyNguoiDung/DangNhap", user);
  },

  getUserList: () => {
    return axiosClient.get(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  },

  addUser: (user) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", user);
  },

  deleteUser: (account) => {
    return axiosClient.delete(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`
    );
  },

  editUserInfo: (user) => {
    return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
  },

  getAccountInfo: (info) => {
    return axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan", info);
  },
};

export default userAPI;
