import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Drawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import DarkMode from "./DarkMode";
const useStyles = makeStyles({
  list: {
    display: "flex",
    // justifyContent: "center",
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

const LeftDrawer = ({ openDrawer, toggleDrawer }) => {
  const classes = useStyles();

  const list = () => (
    <div className={clsx(classes.list)} role="presentation" onKeyDown={toggleDrawer}>
      <List>
        {["Login", "Create an account"].map((text) => (
          <ListItem button key={text} className={classes.listItem} onClick={toggleDrawer}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.divider} />
      <List>
        {["Home", "Profile", "Sign out"].map((text, index) => (
          <ListItem button key={text} onClick={toggleDrawer}>
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
