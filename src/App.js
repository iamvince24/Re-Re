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
import { green, purple } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import { useMediaQuery } from "@mui/material";

function App(props) {
  const loginStatus = false;
  const isSmall500 = useMediaQuery("(max-width:500px)");

  return (
    <Fragment>
      <Router>
        {loginStatus ? null : (
          <Navigation theme={props.theme} isSmall500={isSmall500} />
        )}
        <Routes>
          <Route
            path="/"
            element={<Home theme={props.theme} isSmall500={isSmall500} />}
          />
          <Route
            path="/login"
            element={<Login theme={props.theme} isSmall500={isSmall500} />}
          />
          <Route
            path="/application"
            element={<Application theme={props.theme} />}
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
