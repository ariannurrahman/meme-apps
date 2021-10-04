import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Box } from "@material-ui/core";
import Image from "material-ui-image";
import Swal from "sweetalert2";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { useDispatch, useSelector } from "react-redux";

//LOCAL
import { customStyle } from "../Theme/customStyle";
import { uploadFile } from "../../store/actions";
import { LoadingMain } from "../Loading/Loading";
const UploadImage = ({ toggle, isOpen, userUid }) => {
  const classes = customStyle();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.darkMode);

  const [imagePreview, setImagePreview] = useState({});
  const [postFile, setPostFile] = useState([]);
  const [isFinishChooseFile, setIsFinishChooseFile] = useState(false);
  const [postForm, setPostForm] = useState({});

  const onChangeUploadPicture = ({ target }) => {
    setImagePreview((prevState) => ({ ...prevState, file: URL.createObjectURL(target.files[0]) }));
    setPostFile((prevState) => [...prevState, target.files[0]]);
    setIsFinishChooseFile((prevState) => !prevState);
  };

  const onChangeForm = ({ target }) => {
    setPostForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const onClickPost = async () => {
    if (!postForm.title) return Swal.fire("Error", "Please input title of your post", "error");
    if (!postForm.description) return Swal.fire("Error", "Please input description of your post", "error");

    await dispatch(uploadFile(postForm, userUid, postFile));

    Swal.fire({
      title: "Your post has been posted",
      icon: "success",
      showCancelButton: false,
      background: theme ? "rgb(250,250,250)" : "rgb(48,48,48)",
      confirmButtonColor: theme ? "" : "rgb(154,164,172)",
      confirmButtonText: "<b>Let's laugh</b>",
    }).then(() => {
      window.location.reload();
    });

    setImagePreview({});
    setPostFile([]);
    setPostForm({});
    setIsFinishChooseFile(false);

    toggle();
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={toggle}>
      <LoadingMain />
      <DialogTitle onClose={toggle}>Upload a Post</DialogTitle>
      <Divider />

      <DialogContent className={classes.postFormContainer}>
        {isFinishChooseFile ? (
          <form className={classes.postFormWrapper}>
            <Box className={classes.postFormTop}>
              <div style={{ width: "100%" }}>
                <Image
                  className={classes.postImage}
                  src={imagePreview.file || "-"}
                  alt="user upload"
                  aspectRatio={1}
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
            </Box>

            <Box className={classes.postFormBottom}>
              <TextField
                name="title"
                id="post-title"
                className={classes.postForm}
                onChange={onChangeForm}
                placeholder="Title.."
              />
              <TextField
                name="description"
                className={classes.postForm}
                id="post-description"
                onChange={onChangeForm}
                placeholder="Describe your post.."
                multiline
                rows={3}
              />
            </Box>
          </form>
        ) : null}
      </DialogContent>

      {!isFinishChooseFile ? (
        <form className={classes.postFormWrapper}>
          <DialogContent style={{ paddingTop: "0px" }}>
            <input
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              // onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))}
              onChange={(e) => onChangeUploadPicture(e)}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="secondary" component="span" className={classes.chooseFile}>
                <AddBoxOutlinedIcon color="primary" />
                Choose a file
              </Button>
            </label>
          </DialogContent>
        </form>
      ) : null}

      <Divider />
      <DialogActions>
        {isFinishChooseFile ? (
          <>
            <Button
              color="primary"
              variant="text"
              onClick={() => {
                setIsFinishChooseFile(false);
                toggle();
              }}
            >
              Close
            </Button>
            <Button
              onClick={onClickPost}
              variant="contained"
              color="secondary"
              component="span"
              className={classes.postButton}
            >
              Post a picture
            </Button>
          </>
        ) : (
          <Button
            onClick={toggle}
            variant="contained"
            color="secondary"
            component="span"
            className={classes.postButton}
          >
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UploadImage;
