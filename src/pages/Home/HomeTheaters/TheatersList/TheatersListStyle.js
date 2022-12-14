import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  flexTheater: {
    display: "flex",
  },
  theaterList: (props) => ({
    flex: "0 0 40%",
    overflowY: "auto",
    height: 705,
    overflowX: "hidden",
    borderLeft: "1px solid #ebebec",
    borderBottom: "none",
    ...props.customScrollbar,
  }),

  theater: (props) => ({
    display: "flex",
    cursor: "pointer",
    padding: "20px 15px 15px 20px",
    opacity: 0.5,
    transition: "all .2s",
    "&:hover": {
      opacity: [[1], "!important"],
    },
    ...props.underLine,
  }),
  theater__img: {
    width: 50,
    height: 50,
  },
  theater__info: {
    paddingLeft: 10,
    width: "calc(100% - 50px)",
  },
  theater__address: {
    fontSize: "12px",
    color: "#949494",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});
export default useStyles;
