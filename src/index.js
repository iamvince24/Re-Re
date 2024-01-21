import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Provider } from "react-redux";
import store from "./redux/store";

const websocketUrl = "ws://localhost:3000";
const socket = new WebSocket(websocketUrl);
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
    colorOption: {
      white: {
        solid: "#F4F4F3",
        gradient: {
          gradientLeft: "#BFBFBF",
          gradientRight: "#F4F4F3",
        },
      },
      blue: {
        solid: "#2E4AF3",
        gradient: {
          gradientLeft: "#469EFF",
          gradientRight: "#DFEEFF",
        },
      },
      yellow: {
        solid: "#FEB902",
        gradient: {
          gradientLeft: "#FFE49D",
          gradientRight: "#FFF6DE",
        },
      },
      red: {
        solid: "#FE0000",
        gradient: {
          gradientLeft: "#FF6363",
          gradientRight: "#FFE0E0",
        },
      },
      green: {
        solid: "#008D8B",
        gradient: {
          gradientLeft: "#00E3E0",
          gradientRight: "#DFFFFF",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App state={store.getState()} dispatch={store.dispatch} theme={theme} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
