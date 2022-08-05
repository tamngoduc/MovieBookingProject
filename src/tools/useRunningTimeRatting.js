import { useEffect, useState } from "react";
import axiosClient from "../services/axiosClient";
export default function UseRunningTimeRatting(movieID) {
  const [movieData, setMovieData] = useState({
    timeRunning: "120",
    ratting: "10",
  });
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axiosClient.get(
          `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieID}`
        );
        setMovieData((movieData) => ({
          ...movieData,
          timeRunning:
            response?.heThongRapChieu?.[0]?.cumRapChieu?.[0]?.lichChieuPhim?.[0]
              ?.thoiLuong,
          ratting: response?.danhGia,
        }));
      } catch (error) {
        throw error;
      }
    };
    loadData();
  }, []);
  return { runningTime: movieData.timeRunning, ratting: movieData.ratting };
}
