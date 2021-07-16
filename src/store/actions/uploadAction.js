import { UPLOAD_POST_ERROR, UPLOAD_POST_SUCCESS } from "./types";
import { storage, firestore } from "../../components/Firebase/FirebaseConfig";
import { format } from "date-fns";
export const uploadFile = (form, userUid, file) => (dispatch) => {
  console.log(form);
  try {
    const uploadTask = storage
      .ref(`image_files/${userUid}`)
      .child(`${form.title}_${format(new Date(), "t")}`)
      .put(file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        throw error;
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          firestore
            .collection("posts")
            .add({
              ...form,
              imageURl: downloadURL,
              downVote: 0,
              upVote: 0,
              createdAt: format(new Date(), "t"),
              createdBy: userUid,
            })
            .then((res) => {
              dispatch({
                type: UPLOAD_POST_SUCCESS,
                payload: res,
              });
            })
            .catch((err) => {
              dispatch({
                type: UPLOAD_POST_ERROR,
                payload: err,
              });
              throw err;
            });
        });
      }
    );

    console.log(uploadTask);
  } catch (error) {
    throw error;
  }
};
