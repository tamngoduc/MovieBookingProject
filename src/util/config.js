import { createTheme } from "@mui/material/styles";

export const BASE_URL = "https://movienew.cybersoft.edu.vn/api";
export const GROUPID = "GP01";
export const theaterColor = {
  BHD: "#8bc541",
  CGV: "#e71a0f",
  CNS: "#df0d7a",
  GLX: "#ff751a",
  LOT: "#cf544b",
  MEG: "#eeb730",
};
export const theaterLogo = {
  BHD: "/img/logo-theater/bhd.png",
  CGV: "/img/logo-theater/cgv.png",
  CNS: "/img/logo-theater/cin.png",
  GLX: "/img/logo-theater/gal.png",
  LOT: "/img/logo-theater/lot.png",
  MEG: "/img/logo-theater/meg.png",
};
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 678,
      md: 736,
      lg: 768,
      xl: 992,
    },
  },
});
