import { makeStyles } from "@material-ui/core/styles";

export const customHomeStyle = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  cardContainer: {
    marginBottom: "8vh",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    display: "block",
    minWidth: "160px",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    flex: "1",
    objectFit: "contain !important",
    padding: "12px",
  },
  titleText: {
    fontWeight: "800",
    textAlign: "center",
  },
  cardBottom: {
    // height: "10vh",
  },
  cardDivider: {
    margin: "8vh 0",
  },
  shareContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  shareWrapper: {
    display: "flex",
    flexFlow: "wrap row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
}));
