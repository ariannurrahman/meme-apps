import React from "react";
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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import DarkMode from "./DarkMode";
const useStyles = makeStyles({
  list: {
    display: "flex",
    // justifyContent: "center",
    marginTop: "5vh",
    flexDirection: "column",
    alignItems: "center",
    width: 250,
  },
  listItem: {
    width: "300px",
    textAlign: "center",
  },
  divider: {
    width: "80%",
    height: "2px",
  },
});

const LeftDrawer = ({ openDrawer, toggleDrawer, isSignedIn, signOutFunction, displayName, photoURL }) => {
  const classes = useStyles();

  const onClickListButton = (index) => {
    if (index === 2) {
      signOutFunction();
      toggleDrawer();
    } else {
      toggleDrawer();
    }
  };

  const list = () => (
    <div className={clsx(classes.list)} role="presentation" onKeyDown={toggleDrawer}>
      <List>
        {isSignedIn ? (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Avatar alt="profile avatar" src={photoURL} className={classes.avatar} />{" "}
            <h3 className={classes.displayName}> {displayName || "-"}</h3>
          </Box>
        ) : (
          ["Login", "Create an account"].map((text) => (
            <ListItem button key={text} className={classes.listItem} onClick={toggleDrawer}>
              <ListItemText primary={text} />
            </ListItem>
          ))
        )}
      </List>
      <Divider className={classes.divider} />
      <List>
        {["Home", "Profile", "Sign out"].map((text, index) => (
          <ListItem button key={text} onClick={() => onClickListButton(index)}>
            <ListItemIcon>
              {index === 0 ? <HomeIcon /> : index === 1 ? <AccountCircleIcon /> : <ExitToAppIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
