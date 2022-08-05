import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: "visible",
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: "translate(50%,-50%)",
    border: "2px solid white",
    "&:focus": {
      outline: "none",
    },
    "&:hover": { opacity: 0.7 },
    transition: "all .2s",
  },
  iframe: {
    width: "898px",
    height: "505px",
    [theme.breakpoints.down("lg")]: {
      width: "598px",
      height: "336px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "fit-content",
      height: "fit-content",
    },
  },
}));

export default useStyles;
