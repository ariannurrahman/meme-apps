import { makeStyles } from "@material-ui/core/styles";

export const customStyle = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    padding: "8vh 4vw 8vh 4vw",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    minHeight: "100%",
    width: "80%",
  },
  title: {
    fontWeight: "700",
    alignSelf: "start",
    marginBottom: "4vh",
  },
  subTitle: {
    fontWeight: "600",
  },

  profileForm: {
    width: "100%",
    padding: "20px 0px",
    textAlign: "center",
    margin: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  profileTextField: {
    margin: "8px 8px",
    width: "280px",
  },

  profilePicture: {
    position: "relative !important",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  profileButton: {
    width: "280px",
    margin: "12px",
    padding: "8px",
  },

  postFormContainer: {
    display: "flex",
    flexDirection: "row",
  },
  postFormWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  postFormTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
  },
  postFormBottom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  postButton: {
    padding: "8px",
    width: "160px",
    alignSelf: "center",
  },

  postImage: {
    display: "inline-block",
    minWidth: "160px",
    minHeight: "100%",
    objectFit: "cover !important",
    flex: 1,
  },
  postForm: {
    width: "80%",
    marginTop: "12px",
    border: "2px solid grey",
    padding: "8px",
    // flex: "1",
  },
}));
