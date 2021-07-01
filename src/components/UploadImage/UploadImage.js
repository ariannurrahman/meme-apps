import { Button } from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  postButton: {
    padding: "8px",
    width: "160px",
    alignSelf: "center",
  },
}));

const UploadImage = () => {
  const classes = useStyles();

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" color="secondary" component="span" className={classes.postButton}>
          <AddBoxOutlinedIcon color="primary" />
          Post a picture
        </Button>
      </label>
    </>
  );
};

export default UploadImage;
