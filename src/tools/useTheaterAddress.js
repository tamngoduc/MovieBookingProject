import { useEffect, useState } from "react";
import axiosClient from "../services/axiosClient";

export default function useTheaterAddress(showtimeID) {
  const [addressData, setAddressData] = useState({ address: "loading..." });
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axiosClient.get(
          `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeID}`
        );
        setAddressData({
          address: response?.thongTinPhim?.diaChi,
        });
      } catch (error) {
        throw error;
      }
    };
    loadData();
  }, []);
  return { address: addressData.address };
}
