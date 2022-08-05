import axiosClient from "./axiosClient";
import { GROUPID } from "../util/config";

const theaterAPI = {
  getTheatersInfo: () => {
    return axiosClient.get("QuanLyRap/LayThongTinHeThongRap");
  },

  getTheaterBranchesInfo: (theaterID) => {
    return axiosClient.get(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${theaterID}`
    );
  },

  getTheaterBranchesShowtime: () => {
    return axiosClient.get(
      `QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  },

  getMovieShowtime: (movieID) => {
    return axiosClient.get(
      `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieID}`
    );
  },
};

export default theaterAPI;
