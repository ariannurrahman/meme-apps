import { useState } from "react";
import { AppBar, Toolbar, Typography, CssBaseline, Button, Box } from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { makeStyles } from "@material-ui/core/styles";
import HideOnScroll from "./HideOnScroll";
import LeftDrawer from "./LeftDrawer";
import DarkMode from "./DarkMode";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },

  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  childBox: {
    flex: 1,
  },
  postButton: {
    padding: "8px",
    width: "160px",
    alignSelf: "center",
  },
}));

const Header = ({ props }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.wrapper}>
          <Toolbar className={classes.wrapper}>
            <Box className={classes.childBox} display="flex" alignItems="center">
              <LeftDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />

              <Typography variant="h6" className={classes.title}>
                FUN!
              </Typography>
            </Box>
            <Button className={classes.postButton} variant="contained" color="secondary">
              <AddBoxOutlinedIcon color="primary" />
              Post a picture
            </Button>
            <Box
              className={classes.childBox}
              display={{ xs: "none", sm: "none", md: "flex", lg: "flex" }}
              justifyContent="flex-end"
              alignItems="center"
            >
              <DarkMode />
              <Button>Log in</Button>
              <Button variant="contained">Create an account</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Header;

/* <Link
  color="textPrimary"
  component="button"
  variant="button"
  onClick={() => {
    console.info("I'm a button.");
  }}
>
  Log in
</Link>; */
