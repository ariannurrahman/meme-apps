import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import {
  Drawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// LOCAL
import google from "../../images/icons/google.png";
import facebook from "../../images/icons/facebook.png";

import DarkMode from "./DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { signInWithProvider, signInWithEmailPassword, signUpWithEmailpassword } from "../../store/actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  iconWrapper: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  icon: {
    display: "flex",
    width: "40px",
    objectFit: "contain",
    marginRight: "8px",
    // padding: "2px",
  },
  iconButton: {
    flex: 1,
    margin: "8px 8px",
  },
  formControl: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  textField: {
    margin: "8px 8px",
  },
  list: {
    display: "flex",
    marginTop: "4vh",
    flexDirection: "column",
    alignItems: "center",
    width: 250,
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "300px",
    textAlign: "center",
  },
  listItemText: {
    textAlign: "center",
    borderBottom: "2px solid grey",
    width: "80%",
    padding: "4px",
    fontWeight: "800",
  },
  buttonToggle: {
    width: "100%",
  },
  divider: {
    width: "80%",
    height: "2px",
  },
});

const LeftDrawer = ({ openDrawer, toggleDrawer, isSignedIn, signOutFunction, displayName, photoURL }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userUid = useSelector((state) => state.auth?.userData?.uid || "");

  const [readySignin, setReadySignin] = useState(false);
  const [signupForm, setSignupForm] = useState({});

  const [loginForm, setLoginForm] = useState({});

  const loginWithProvider = async ({ target }) => {
    dispatch(signInWithProvider(target.outerText));
  };

  const onClickSignout = () => {
    signOutFunction();
    history.push("/");
    toggleDrawer();
  };

  const onChangeFormLogin = ({ target }) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  };

  const onClickSignInWithEmailPassword = () => {
    if (!loginForm.email || !loginForm.password) return;

    try {
      dispatch(signInWithEmailPassword(loginForm.email, loginForm.password));
    } catch (error) {
      throw error;
    }
  };

  const onChangeSignup = ({ target }) => {
    setSignupForm((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  };

  const onClickSignup = () => {
    if (!signupForm.displayName || !signupForm.email || !signupForm.password) return;
    try {
      dispatch(signUpWithEmailpassword(signupForm));
      history.push("/");
      toggleDrawer();
    } catch (error) {
      throw error;
    }
  };

  const list = () => (
    <div className={clsx(classes.list)} role="presentation">
      <List>
        {isSignedIn ? (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Avatar alt="profile avatar" src={photoURL} className={classes.avatar} />{" "}
            <h3 className={classes.displayName}> {displayName || "-"}</h3>
          </Box>
        ) : (
          <>
            <ListItem className={classes.formControl}>
              {!readySignin ? (
                <form className={classes.formControl}>
                  <Button variant="contained" className={classes.iconButton} onClick={(e) => loginWithProvider(e)}>
                    <img alt="google sign in" src={google} className={classes.icon} />
                    Google
                  </Button>

                  <Button
                    disabled
                    variant="contained"
                    className={classes.iconButton}
                    onClick={(e) => loginWithProvider(e)}
                  >
                    <img alt="facebook sign in" src={facebook} className={classes.icon} />
                    Facebook
                  </Button>

                  <TextField
                    className={classes.textField}
                    required
                    id="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    onChange={onChangeFormLogin}
                    autoComplete="off"
                    color="secondary"
                  />
                  <TextField
                    className={classes.textField}
                    required
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={onChangeFormLogin}
                    color="secondary"
                    autoComplete="off"
                  />

                  <Button
                    className={classes.textField}
                    onClick={() => onClickSignInWithEmailPassword()}
                    color="secondary"
                    variant="contained"
                    type="submit"
                  >
                    Log in
                  </Button>
                </form>
              ) : (
                <ListItemText
                  className={classes.listItemText}
                  primary={!readySignin ? "Login" : "Have an account?"}
                  color="secondary"
                  onClick={() => setReadySignin(!readySignin)}
                />
              )}
            </ListItem>

            {/* SIGN UP */}
            <ListItem className={classes.listItem}>
              {readySignin ? (
                <form className={classes.formControl}>
                  <TextField
                    className={classes.textField}
                    required
                    id="displayName"
                    type="text"
                    label="Full name"
                    variant="outlined"
                    onChange={onChangeSignup}
                    autoComplete="off"
                    color="secondary"
                  />
                  <TextField
                    className={classes.textField}
                    required
                    id="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    onChange={onChangeSignup}
                    autoComplete="off"
                    color="secondary"
                  />
                  <TextField
                    className={classes.textField}
                    required
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={onChangeSignup}
                    color="secondary"
                    autoComplete="off"
                  />
                  <Button
                    onClick={() => onClickSignup()}
                    color="secondary"
                    variant="contained"
                    className={classes.textField}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </form>
              ) : (
                <ListItemText
                  className={classes.listItemText}
                  primary={readySignin ? "Create an account" : "Don't have an account?"}
                  color="secondary"
                  onClick={() => setReadySignin(!readySignin)}
                />
              )}
            </ListItem>
          </>
        )}
      </List>
      <Divider className={classes.divider} />
      <List>
        <ListItem
          button
          onClick={() => {
            history.push("/");
            toggleDrawer();
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            history.push(`/profile/${userUid}`);
            toggleDrawer();
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        {!isSignedIn ? null : (
          <ListItem button onClick={onClickSignout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        )}
      </List>
      <Divider className={classes.divider} />
      <List>
        <ListItem>
          <DarkMode />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </>
  );
};

export default LeftDrawer;
