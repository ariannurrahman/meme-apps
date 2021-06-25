import { useState } from "react";
import { AppBar, Toolbar, Typography, CssBaseline, Button, Box, Avatar } from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// LOCAL
import HideOnScroll from "./HideOnScroll";
import LeftDrawer from "./LeftDrawer";
import DarkMode from "./DarkMode";

import LoginModal from "../Auth/LoginModal";
import SignupModal from "../Auth/SignupModal";
import { useSelector, useDispatch } from "react-redux";
import { resetErrorMessage, signOut } from "../../store/actions";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  homeLink: {
    fontWeight: 800,
    textDecoration: "none",
  },
  logo: {
    fontWeight: 800,
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
  avatar: {
    marginLeft: "12px",
  },
  profileButton: {
    padding: "0 8px",
    margin: "0 12px",
  },
  profileLink: {
    textDecoration: "none",
  },
  profileText: {
    padding: "0",
    margin: "8px",
    textDecoration: "none",
    fontWeight: "700",
  },
}));

const Header = ({ props }) => {
  const authMessage = useSelector((state) => state.auth?.message);
  const isSignedIn = useSelector((state) => state.auth?.isSignedIn);
  const displayName = useSelector((state) => state.auth?.userData?.displayName || "-");
  const photoURL = useSelector((state) => state.auth?.userData?.photoURL || "-");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const toggleLoginModal = () => {
    setOpenLoginModal(!openLoginModal);
    dispatch(resetErrorMessage());
  };

  const toggleSignupModal = () => {
    setOpenSignupModal(!openSignupModal);
    dispatch(resetErrorMessage());
  };

  const renderAuthButton = () => {
    if (isSignedIn) {
      return (
        <Box
          className={classes.childBox}
          display={{ xs: "none", sm: "none", md: "flex", lg: "flex" }}
          justifyContent="flex-end"
          alignItems="center"
        >
          <DarkMode />
          <Avatar alt="profile avatar" src={photoURL} className={classes.avatar} />
          <Button variant="outlined" className={classes.profileButton} color="secondary">
            <Link className={classes.profileLink} color="secondary" to="/profile">
              <Typography tag="h3" className={classes.profileText} color="textPrimary">
                {displayName || "-"}
              </Typography>
            </Link>
          </Button>
        </Box>
      );
    } else {
      return (
        <Box
          className={classes.childBox}
          display={{ xs: "none", sm: "none", md: "flex", lg: "flex" }}
          justifyContent="flex-end"
          alignItems="center"
        >
          <DarkMode />
          <Button onClick={toggleLoginModal} style={{ margin: "0px 4px" }}>
            Log in
          </Button>
          <Button variant="contained" onClick={toggleSignupModal}>
            Create an account
          </Button>
        </Box>
      );
    }
  };

  const signOutAuth = () => {
    dispatch(signOut());
  };

  return (
    <nav>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.wrapper}>
          <Toolbar className={classes.wrapper}>
            <Box className={classes.childBox} display="flex" alignItems="center">
              <LeftDrawer
                openDrawer={openDrawer}
                toggleDrawer={toggleDrawer}
                isSignedIn={isSignedIn}
                signOutFunction={signOutAuth}
                displayName={displayName}
                photoURL={photoURL}
              />

              <Link className={classes.homeLink} to="/">
                <Typography variant="h5" className={classes.logo} color="textPrimary">
                  FUN!
                </Typography>
              </Link>
            </Box>
            <Button className={classes.postButton} variant="contained" color="secondary">
              <AddBoxOutlinedIcon color="primary" />
              Post a picture
            </Button>
            {renderAuthButton()}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <LoginModal isOpen={openLoginModal} toggle={toggleLoginModal} authMessage={authMessage} />
      <SignupModal isOpen={openSignupModal} toggle={toggleSignupModal} authMessage={authMessage} />
    </nav>
  );
};

export default Header;
