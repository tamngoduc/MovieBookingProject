// đây chỉ là function nhằm mục đích tạo ra data mới từ currentSelectedHeThongRapChieu
const selectDesktopData = (currentSelectedHeThongRapChieu) => {
  // lọc ra tất cả lichChieuPhim và add thêm props tenCumRap để nhận biết lichChieuPhim này thuộc cụm rạp nào
  const arrayAllLichChieuPhim =
    currentSelectedHeThongRapChieu.cumRapChieu.reduce((colect, item) => {
      return [
        ...colect,
        ...item.lichChieuPhim.map((lichChieu) => ({
          ...lichChieu,
          tenCumRap: item.tenCumRap,
        })),
      ];
    }, []);

  // tạo mảng chỉ chứa ngày
  const arrayAllDay = arrayAllLichChieuPhim.map((item) => {
    return item.ngayChieuGioChieu.slice(0, 10); // tạo mảng mới với item là "2020-12-17" cắt ra từ 2020-12-17T10:10:00
  });
  const arrayDay = [...new Set(arrayAllDay)].sort(); // xóa đi phần tử trùng lặp

  // [ [{},{},{}], [{},{},{}], [{},{},{}]] : array chứa dữ liệu theo ngày, array con: [{ tenCumRap, maLichChieu, lichChieuPhim },{}]
  const allArrayCumRapChieuFilterByDay = arrayDay.map((day) => {
    // tạo mảng chứa lichchieuphim filter theo ngày
    const arrayLichChieuPhimFilterByDay = arrayAllLichChieuPhim.filter(
      (item) => {
        if (item.ngayChieuGioChieu.slice(0, 10) === day) {
          return true;
        }
        return false;
      }
    );

    // loại bỏ cumRapChieu trùng lặp
    const arrayCumRapChieuRemoveDup = arrayLichChieuPhimFilterByDay?.filter(
      (itemIncrease, indexIncrease, arr) => {
        const indexFirstFounded = arr.findIndex(
          (t) => t.tenCumRap === itemIncrease.tenCumRap
        );
        return indexIncrease === indexFirstFounded;
      }
    );

    // tạo mảng cumRapChieu
    const arrayCumRapChieu = arrayCumRapChieuRemoveDup.map((cumRapChieu) => {
      const tenCumRap = cumRapChieu.tenCumRap;
      const maLichChieu = cumRapChieu.maLichChieu;
      // tạo mảng lichChieuPhim: trùng tenCumRap
      const lichChieuPhim = arrayLichChieuPhimFilterByDay.filter(
        (lichChieuPhim) => lichChieuPhim.tenCumRap === tenCumRap
      );
      return { tenCumRap, maLichChieu, lichChieuPhim };
    });

    return arrayCumRapChieu;
  });
  return { arrayDay, allArrayCumRapChieuFilterByDay };
};

export default selectDesktopData;
