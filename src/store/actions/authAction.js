import firebase from "firebase/app";
import { auth, googleProvider } from "../../components/Firebase/FirebaseConfig";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_UP_SUCCESS,
  RESET_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_DISPLAY_NAME_SUCCESS,
  CHANGE_DISPLAY_NAME_ERROR,
} from "./types";

export const signInWithProvider = (providerName) => (dispatch) => {
  firebase.auth().useDeviceLanguage();
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      // var credential = result.credential;
      // var token = credential.accessToken;
      console.log("result: ", result);
      var user = result.user;
      // var displayName = user.displayName;

      dispatch({ type: SIGN_IN_SUCCESS, payload: user });
    })
    .catch((error) => {
      console.log("error: ", error);

      dispatch({ type: SIGN_IN_ERROR, payload: error.message });
    });
};

export const signInWithEmailPassword = (email, password) => (dispatch) => {
  try {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        let user = result.user;
        dispatch({ type: SIGN_IN_SUCCESS, payload: user, message: "Sign in success" });
      })
      .catch((error) => {
        dispatch({ type: SIGN_IN_ERROR, payload: error.message });
      });
  } catch (error) {
    dispatch({ type: SIGN_IN_ERROR, payload: error.message });
  }
};

export const signUpWithEmailpassword = (form) => (dispatch) => {
  let { email, password, displayName } = form;

  try {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            dispatch({ type: SIGN_UP_SUCCESS, payload: user });
          })
          .catch((error) => {
            dispatch({ type: SIGN_UP_ERROR, payload: error.message });
          });

        // ...
      })
      .catch((error) => {
        dispatch({ type: SIGN_UP_ERROR, payload: error.message });
      });
  } catch (error) {
    dispatch({ type: SIGN_UP_ERROR, payload: error.message });
  }
};

export const resetPasswordByEmail = (email) => (dispatch) => {
  auth
    .sendPasswordResetEmail(email)
    .then((result) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: result,
      });
    })
    .catch((error) => {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: error,
      });
    });
};

export const changeProfileInfo = (newName, photoSrc) => (dispatch) => {
  const user = auth.currentUser;

  if (user) {
    user
      .updateProfile({
        displayName: newName,
        // photoURL: photoSrc ? photoSrc : null,
      })
      .then(() => {
        dispatch({ type: CHANGE_DISPLAY_NAME_SUCCESS, payload: user });
      })
      .catch((error) => {
        dispatch({ type: CHANGE_DISPLAY_NAME_ERROR, payload: error });
      });
  }
};

export const signOut = () => (dispatch) => {
  try {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: SIGN_OUT_SUCCESS, payload: "Sign out success" });
      })
      .catch((error) => {
        dispatch({ type: SIGN_OUT_ERROR, payload: error });
      });
  } catch (error) {
    dispatch({ type: SIGN_OUT_ERROR, payload: error });
  }
};

export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR,
  };
};
