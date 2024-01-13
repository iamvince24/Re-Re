import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// const websocketUrl =
//   process.env.REACT_APP_WEBSOCKET_URL || "ws://127.0.0.1:55178/";
const websocketUrl = "ws://localhost:3000";

// Create WebSocket connection
const socket = new WebSocket(websocketUrl);

// Listen for possible errors
socket.addEventListener("error", (event) => {
  console.log("WebSocket error: ", event);
});

const theme = createTheme({
  palette: {
    primary: {
      // main: "#2E4AF3",
      main: "#F4F4F3",
      light: "#F2D4CC",
    },
    lightPrimary: {
      main: "#f3d9d2",
    },
    secondary: {
      main: "#262626",
      // light: "#F5EBFF",
      // contrastText: "#47008F",
    },
    background: {
      main: "#F3D9D2",
    },
    buttonBackground: {
      main: "#D69F95",
    },
    action: {
      hover: "white",
    },
    ganttHoliday: {
      main: "rgb(71,71,71,0.4)",
    },
    dividerBorder: {
      main: "#F4F4F3",
    },
    iconColor: {
      white: {
        solid: "#F4F4F3",
        gradientLeft: "#F4F4F3",
        gradientRight: "#F4F4F3",
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App theme={theme} />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
