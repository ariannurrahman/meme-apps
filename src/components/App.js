import { BrowserRouter, Route, Switch } from "react-router-dom";
import "firebase/auth";
// import "firebase/analytics";
// import "firebase/firestore"

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
import Profile from "./Profile/Profile";
import CardDetail from "./Home/CardDetail";
import "./style.css";

const App = () => {
  const theme = useSelector((state) => state.theme.darkMode);
  const appliedTheme = createMuiTheme(theme ? lightTheme : darkTheme);
  const userUid = useSelector((state) => state.auth?.userData?.uid || "");
  console.log(userUid);
  return (
    <BrowserRouter>
      <ThemeProvider theme={appliedTheme}>
        <Header userUid={userUid} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile/:uid" exact component={() => <Profile userUid={userUid} />} />
          <Route path="/post/:uid" exact component={() => <CardDetail />} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
