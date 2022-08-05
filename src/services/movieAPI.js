import axiosClient from "./axiosClient";
import { GROUPID } from "../util/config";

const movieAPI = {
  getBannerList: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachBanner");
  },

  getMovieList: () => {
    return axiosClient.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  },

  getMovieInfo: (movieID) => {
    return axiosClient.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieID}`);
  },

  addNewMovie: (movie) => {
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  },

  updateMovie: (movie) => {
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post("QuanLyPhim/CapNhatPhimUpload", formData);
  },

  deleleMovie: (movieID) => {
    return axiosClient.delete(`/QuanLyPhim/XoaPhim?MaPhim=${movieID}`);
  },
};

export default movieAPI;
