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

function App() {
  const loginStatus = false;

  return (
    <Fragment>
      <Router>
        {loginStatus ? null : <Navigation />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/application" element={<Application />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
