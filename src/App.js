import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

  const isSmallScreenW500 = useMediaQuery("(max-width:500px)");
  const isSmallScreenW767 = useMediaQuery("(max-width:767px)");
  dispatch(handleScreenWidth500(isSmallScreenW500));
  dispatch(handleScreenWidth767(isSmallScreenW767));

  return (
    <Fragment>
      <Router>
        {loginStatus ? null : (
          <Navigation
            theme={theme}
            isSmallScreenW500={isSmallScreenW500}
            isSmallScreenW767={isSmallScreenW767}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                theme={theme}
                isSmallScreenW500={isSmallScreenW500}
                isSmallScreenW767={isSmallScreenW767}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login theme={theme} isSmallScreenW500={isSmallScreenW500} />
            }
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
