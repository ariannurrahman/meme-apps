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
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab/";
import google from "../../images/icons/google.png";
import facebook from "../../images/icons/facebook.png";
import { signInWithProvider, signUpWithEmailpassword } from "../../store/actions";

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

const SignupModal = ({ isOpen, toggle, authMessage }) => {
  const [signupForm, setSignupForm] = useState({});

  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangeFormLogin = ({ target }) => {
    setSignupForm((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  };

  const loginWithProvider = async ({ target }) => {
    dispatch(signInWithProvider(target.outerText));
    toggle();
  };

  const onClickSignup = () => {
    if (!signupForm.displayName || !signupForm.email || !signupForm.password) return;
    try {
      dispatch(signUpWithEmailpassword(signupForm));
      toggle();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Dialog fullWidth open={isOpen} onClose={toggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Hey There!</DialogTitle>

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
          <p>Post your favorite meme, and share it to the whole world!</p>
        </DialogContent>

        <form>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="displayName"
                type="text"
                label="Full name"
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
          <Button onClick={() => onClickSignup()} color="secondary" variant="outlined">
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignupModal;
