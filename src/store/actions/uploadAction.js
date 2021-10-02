import { UPLOAD_POST_ERROR, UPLOAD_POST_SUCCESS } from "./types";
import { storage, firestore } from "../../components/Firebase/FirebaseConfig";
import { format } from "date-fns";
import { mainLoading, progressLoading } from "../actions";
export const uploadFile = (form, userUid, file) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(mainLoading(true));

    const uploadTask = storage
      .ref(`image_files/${userUid}`)
      .child(`${form.title}_${format(new Date(), "t")}`)
      .put(file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(progressLoading(progress));
      },
      (error) => {
        throw error;
      },
      async () => {
        await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          firestore
            .collection("posts")
            .add({
              ...form,
              imageURl: downloadURL,
              downVote: [],
              upVote: [],
              createdAt: format(new Date(), "t"),
              createdBy: userUid,
            })
            .then(async (res) => {
              await dispatch({
                type: UPLOAD_POST_SUCCESS,
                payload: res,
              });
              dispatch(mainLoading(false));
              resolve();
            })
            .catch((err) => {
              dispatch({
                type: UPLOAD_POST_ERROR,
                payload: err,
              });
              dispatch(mainLoading(false));
              reject();
              throw err;
            });
        });
      }
    );
  });
