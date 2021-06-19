import { BrowserRouter, Route, Switch } from "react-router-dom";

// THEME
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { darkTheme, lightTheme } from "./Theme/darkOrLightTheme";
// import Brightness3Icon from "@material-ui/icons/Brightness3";
// import Brightness7Icon from "@material-ui/icons/Brightness7";

// LOCAL
import Header from "./Navigation/Header";
import Home from "./Home/Home";
import { useSelector } from "react-redux";

const App = () => {
  const theme = useSelector((state) => state.darkMode.darkMode);

  const appliedTheme = createMuiTheme(theme ? lightTheme : darkTheme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={appliedTheme}>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
