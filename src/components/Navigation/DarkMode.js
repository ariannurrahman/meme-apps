import { toggleTheme } from "../../store/actions/";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import Brightness2OutlinedIcon from "@material-ui/icons/Brightness2Outlined";
import { makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const DarkMode = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.darkMode.darkMode);
  const useStyles = makeStyles(() => ({
    iconWrapper: {
      width: "40px",
      height: "40px",
      padding: "0",
      // border: `1px double gray`,
      borderRadius: "50%",
      backgroundColor: theme ? grey[300] : grey[700],
    },
    icon: {
      padding: "0",
      margin: "0",
      width: "30px",
      height: "30px",
      objectFit: "scale-down",
    },
  }));
  const classes = useStyles();
  const onClickToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <IconButton onClick={onClickToggle} className={classes.iconWrapper}>
      {theme ? <WbSunnyOutlinedIcon className={classes.icon} /> : <Brightness2OutlinedIcon className={classes.icon} />}
    </IconButton>
  );
};

export default DarkMode;
