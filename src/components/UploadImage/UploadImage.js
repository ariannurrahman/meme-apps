import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Box } from "@material-ui/core";
import Image from "material-ui-image";

import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

//LOCAL
import { customStyle } from "../Theme/customStyle";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../store/actions";
const UploadImage = ({ toggle, isOpen, userUid }) => {
  const classes = customStyle();
  const dispatch = useDispatch();
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

  const onClickPost = () => {
    dispatch(uploadFile(postForm, userUid, postFile));
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={toggle}>
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
          <DialogContent>
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
              <Button variant="contained" color="secondary" component="span" className={classes.postButton}>
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
          <Button variant="contained" color="secondary" component="span" className={classes.postButton}>
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UploadImage;
