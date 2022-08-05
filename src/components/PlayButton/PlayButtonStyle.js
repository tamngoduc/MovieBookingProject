import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",

    zIndex: 1,
    opacity: 0,

    background: "0 0",
    border: "none",

    height: (props) => (props.width ? props.width : 70),
    width: (props) => (props.height ? props.height : 70),
    transition: "all .2s",
  },

  imgPlay: {
    height: "100%",
    width: "100%",
    transition: "all .2s",
    "&:hover": { opacity: 0.7 },
  },
});

export default useStyles;
