import { useState } from "react";
import { Box, Button, Typography, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordByEmail, changeProfileInfo } from "../../store/actions";
import { customStyle } from "../Theme/customStyle";
import Image from "material-ui-image";
const Profile = () => {
  const classes = customStyle();
  const dispatch = useDispatch();
  const [newDisplayName, setNewDisplayName] = useState("");
  const photoURL = useSelector((state) => state.auth.userData.photoURL);
  const displayName = useSelector((state) => state.auth.userData.displayName);
  const email = useSelector((state) => state.auth.userData.email);

  const onClickResetPassword = () => {
    try {
      dispatch(resetPasswordByEmail(email));
    } catch (error) {
      throw error;
    }
  };

  const onClickSaveChange = () => {
    try {
      dispatch(changeProfileInfo(newDisplayName));
    } catch (error) {
      throw error;
    }
  };

  const onChangeDisplayName = ({ target }) => {
    setNewDisplayName(target.value);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <Image
          className={classes.profilePicture}
          src={photoURL}
          alt="profile picture"
          aspectRatio="1"
          style={{ backgroundColor: "transparent", paddingTop: "0", paddingBottom: "20px" }}
        />
        <Typography variant="h6">Edit profile</Typography>
        <form className={classes.profileForm}>
          {/* <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden accept="image/*" />
          </Button> */}
          <TextField
            className={classes.profileTextField}
            color="secondary"
            id="outlined-required"
            label="Display name"
            defaultValue={displayName}
            variant="outlined"
            onChange={onChangeDisplayName}
          />

          <TextField
            className={classes.profileTextField}
            color="secondary"
            disabled
            id="outlined-disabled"
            label="Email"
            defaultValue={email}
            variant="outlined"
          />
          <Button
            className={classes.profileButton}
            variant="contained"
            color="secondary"
            onClick={onClickSaveChange}
            onClickSaveChange
          >
            Save changes
          </Button>
          <Button className={classes.profileButton} variant="contained" color="primary" onClick={onClickResetPassword}>
            Reset Password
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
