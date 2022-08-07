import { useEffect, useState } from "react";
import axiosClient from "../services/axiosClient";

const useCheckIsMovieIDSetShowtime = (movieID) => {
  const [isMovieIDSetShowtime, setIsMovieIDSetShowtime] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axiosClient.get(
          `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieID}`
        );
        const isMovieIDSetShowtime =
          response.heThongRapChieu.length > 0 ? true : false;

        setIsMovieIDSetShowtime(isMovieIDSetShowtime);
      } catch (error) {
        throw error;
      }
    };
    loadData();
  }, []);

  return isMovieIDSetShowtime;
};

export default useCheckIsMovieIDSetShowtime;
