import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  movieList: (props) => ({
    flex: "0 0 60%",
    height: "705px",
    overflowY: "auto",
    borderLeft: "1px solid #ebebec",
    ...props.customScrollbar,
  }),
  movie: (props) => ({
    paddingBottom: "17px",
    paddingTop: "20px",
    paddingRight: "15px",
    paddingLeft: "20px",
    ...props.underLine,
  }),
  movie__info: {
    display: "flex",
  },
  movie__img: {
    width: 50,
    height: 50,
    objectFit: "cover",
  },
  movie__text: {
    paddingLeft: "15px",
    paddingTop: "6px",
    width: "calc(100% - 50px)",
  },
  movie__text_name: {
    fontWeight: 500,
    textTransform: "capitalize",
  },
});
export default useStyles;
