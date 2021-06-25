import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Divider,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab/";

import google from "../../images/icons/google.png";
import facebook from "../../images/icons/facebook.png";
// import { signInWithEmailPassword } from "../Auth/Auth";
import { useDispatch } from "react-redux";
import { signInWithProvider, signInWithEmailPassword } from "../../store/actions";
const useStyles = makeStyles(() => ({
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
    margin: "0 8px",
  },
  formControl: {
    width: "100%",
  },
  dialogActions: {
    padding: "30px",
  },
  dividerBottom: {
    marginTop: "30px",
  },
}));

const LoginModal = (props) => {
  let { isOpen, toggle, authMessage } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({});

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

  const loginWithProvider = async ({ target }) => {
    dispatch(signInWithProvider(target.outerText));
    toggle();
  };

  return (
    <div>
      <Dialog fullWidth open={isOpen} onClose={toggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
        <Divider />

        <DialogContent>
          <p>Connect with a social network</p>
        </DialogContent>
        <DialogContent className={classes.iconWrapper} color="secondary">
          <Button variant="contained" className={classes.iconButton} onClick={(e) => loginWithProvider(e)}>
            <img alt="google sign in" src={google} className={classes.icon} />
            Google
          </Button>

          <Button disabled variant="contained" className={classes.iconButton} onClick={(e) => loginWithProvider(e)}>
            <img alt="facebook sign in" src={facebook} className={classes.icon} />
            Facebook
          </Button>
        </DialogContent>

        <DialogContent>
          <p>Log in with your email</p>
        </DialogContent>

        <form>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                onChange={onChangeFormLogin}
                autoComplete="off"
                color="secondary"
              />
            </FormControl>
          </DialogContent>

          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                onChange={onChangeFormLogin}
                color="secondary"
                autoComplete="off"
              />
            </FormControl>
          </DialogContent>
        </form>

        {!authMessage ? null : <Alert severity="error">{authMessage}</Alert>}

        <Divider className={classes.dividerBottom} />

        <DialogActions className={classes.dialogActions}>
          <Button onClick={toggle} color="secondary" variant="text">
            Cancel
          </Button>
          <Button onClick={() => onClickSignInWithEmailPassword()} color="secondary" variant="outlined" type="submit">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginModal;
