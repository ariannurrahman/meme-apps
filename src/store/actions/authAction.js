import firebase from "firebase/app";
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

var firebaseConfig = {
  apiKey: "AIzaSyCZdZIy2_pGYQ0h4Lp_JoFQnhwf8q3jdpU",
  authDomain: "fun-meme-is-fun.firebaseapp.com",
  projectId: "fun-meme-is-fun",
  storageBucket: "fun-meme-is-fun.appspot.com",
  messagingSenderId: "334829760699",
  appId: "1:334829760699:web:8f8a9e8849b95c072bf99e",
  measurementId: "G-PNLGS7KNSD",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const signInWithProvider = (providerName) => (dispatch) => {
  let provider;

  if (providerName === "GOOGLE") {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  if (providerName === "FACEBOOK") {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  firebase.auth().useDeviceLanguage();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // var credential = result.credential;
      // var token = credential.accessToken;
      var user = result.user;
      // var displayName = user.displayName;

      dispatch({ type: SIGN_IN_SUCCESS, payload: user });
    })
    .catch((error) => {
      dispatch({ type: SIGN_IN_ERROR, payload: error.message });
    });
};

export const signInWithEmailPassword = (email, password) => (dispatch) => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({ type: SIGN_UP_SUCCESS, payload: result });
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
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            dispatch({ type: SIGN_IN_SUCCESS, payload: user });
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
  firebase
    .auth()
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
  const user = firebase.auth().currentUser;

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
    firebase
      .auth()
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
