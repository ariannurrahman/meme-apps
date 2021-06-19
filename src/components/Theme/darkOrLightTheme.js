import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "rgba(5, 5, 5,1)",
    },
    secondary: {
      main: "rgba(154, 164, 172,1)",
    },

    text: {
      primary: "rgba(247, 247, 247,1)",
      secondary: "rgba(154, 164, 172,1)",
    },

    contrastThreshold: 2,
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "rgba(247, 247, 247,1)",
    },
    secondary: {
      main: blue[800],
    },
    text: {
      primary: "rgba(5, 5, 5,1)",
    },
  },
});
