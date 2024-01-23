import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Button from "@mui/material/Button";
import {
  createTheme,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@mui/material/styles";

import Application from "./routes/application";
import Navigation from "./routes/navigation";
import Home from "./routes/home";
import Login from "./routes/login";
import { Fragment } from "react";
import { useMediaQuery } from "@mui/material";
import { handleScreenWidth500 } from "./redux/action";
import { handleScreenWidth767 } from "./redux/action";

function App(props) {
  const { state, dispatch, theme } = props;
  const loginStatus = false;

  const isSmallscreenWidth500 = useMediaQuery("(max-width:500px)");
  const isSmallscreenWidth767 = useMediaQuery("(max-width:767px)");
  dispatch(handleScreenWidth500(isSmallscreenWidth500));
  dispatch(handleScreenWidth767(isSmallscreenWidth767));

  const scrollToHeading = () => {
    // 滚动到目标 h1 标签
    const targetHeading = document.getElementById("targetHeading");
    if (targetHeading) {
      // targetHeading.scrollIntoView({ behavior: "smooth" });
      console.log("ffsdf");
    }
    console.log(targetHeading);
  };

  return (
    <Fragment>
      <Router>
        {loginStatus ? null : (
          <Navigation
            theme={theme}
            isSmall500={isSmallscreenWidth500}
            scrollToHeading={scrollToHeading}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={<Home theme={theme} isSmall500={isSmallscreenWidth500} />}
          />
          <Route
            path="/login"
            element={<Login theme={theme} isSmall500={isSmallscreenWidth500} />}
          />
          <Route
            path="/application"
            element={<Application theme={theme} dispatch={dispatch} />}
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
