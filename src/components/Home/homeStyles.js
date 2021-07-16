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
  cardImage: {
    objectFit: "contain",
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
}));
