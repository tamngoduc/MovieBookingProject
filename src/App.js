import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModalTrailer from "./components/ModalTrailer/ModalTrailer";
import Home from "./pages/Home/Home";
import Loading from "./components/Loading/Loading";
import Login from "./pages/Login/Login";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Register from "./pages/Register/Register";
import AuthTemplate from "./templates/AuthTemplate/AuthTemplate";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import NotFound from "./pages/NotFound/NotFound";
import { theme } from "./util/config";
import BookingTicket from "./pages/BookingTicket/BookingTicket";
import UserProfile from "./pages/UseProfile/UseProfile";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Loading />
        <ModalTrailer />
        <Routes>
          <Route path="/" element={<HomeTemplate />}>
            <Route index element={<Home />} />
            <Route path="/phim/:maPhim" element={<MovieDetail />} />
            <Route path="/taikhoan" element={<UserProfile />} />
          </Route>

          <Route element={<AuthTemplate />}>
            <Route path="/dangnhap" element={<Login />} />
            <Route path="/dangky" element={<Register />} />
          </Route>

          <Route path="/datve/:maLichChieu" element={<BookingTicket />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
