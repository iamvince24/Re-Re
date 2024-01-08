import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/img/logo2.svg";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E4AF3",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
    background: {
      main: "#F3D9D2",
    },
  },
});

export default function Navigation() {
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          padding: "15px 50px",
          // backgroundColor: "var(--primary-color)",
          borderBottom: "2px solid #F0D2CA",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo2}
            alt="re-re"
            style={{
              height: "35px",
            }}
          />
        </Link>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            paddingTop: "5px",
          }}
        >
          <Link
            to="/login"
            style={{
              color: "var(--primary-color)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Log In
          </Link>
          <ThemeProvider theme={theme}>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-color)",
                boxShadow: "none",
              }}
            >
              Start for free
            </Button>
          </ThemeProvider>
        </Box>
      </Box>
    </Fragment>
  );
}
