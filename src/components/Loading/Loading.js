import { useSelector } from "react-redux";
import { CircularProgress, Backdrop } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const LoadingMain = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={isLoading.loadingMain}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
