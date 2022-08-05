import { makeStyles } from "@material-ui/core";
import { customScrollbar } from "../../../styles/materialUi";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 870,
    margin: "auto",
  },
  appBarRoot: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  indicator: {
    backgroundColor: "transparent",
  },
  tapRoot: {
    color: "#fff",
    opacity: 1,
    fontSize: 16,
    "&:hover": {
      fontSize: 18,
    },
    transition: "all .2s",
  },
  selectedTap: {
    color: "#fb4226",
    fontSize: 18,
  },
  noname: {
    "& .MuiBox-root": {
      paddingTop: (props) => (props.isMobile ? 0 : 24),
    },
  },
  detailMovie: {
    fontSize: 14,
  },
}));
export default useStyles;
