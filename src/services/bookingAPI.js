import axiosClient from "./axiosClient";

const bookingAPI = {
  getCinemaInfo: (showtimeID) => {
    return axiosClient.get(
      `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeID}`
    );
  },

  bookTicket: (data) => {
    return axiosClient.post(`/QuanLyDatVe/DatVe`, data);
  },

  createShowtime: (data) => {
    return axiosClient.post("QuanLyDatVe/TaoLichChieu", data);
  },
};

export default bookingAPI;
