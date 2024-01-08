import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const websocketUrl =
//   process.env.REACT_APP_WEBSOCKET_URL || "ws://127.0.0.1:55178/";
const websocketUrl = "ws://localhost:3000";

// Create WebSocket connection
const socket = new WebSocket(websocketUrl);

// Listen for possible errors
socket.addEventListener("error", (event) => {
  console.log("WebSocket error: ", event);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
