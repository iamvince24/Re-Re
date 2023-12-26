// import logo from "./logo.svg";
import { height } from "@mui/system";
import "./App.css";
// import Button from "@mui/material/Button";
import {
  createTheme,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@mui/material/styles";

import Application from "./routes/application";
import { green, purple } from "@mui/material/colors";
import { Box } from "@mui/system";

function App() {
  return (
    <Box
      className="App"
      style={{
        height: "100%",
      }}
    >
      <Application />
    </Box>
  );
}

export default App;
