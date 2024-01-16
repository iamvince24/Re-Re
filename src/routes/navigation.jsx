import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/img/logo2.svg";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import Logo from "../assets/img/logo";
import IconButton from "@mui/material/IconButton";
import { LinkButton } from "../component/Button";

export default function Navigation(props) {
  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            padding: props.isSmall500 ? "7.5px 15px" : "15px 50px",
            borderBottom: "1.5px solid var(--primary-color)",
          }}
        >
          <Link
            to="/"
            color="secondary"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              <Logo
                theme={props.theme}
                // fontSize={"45px"}
                isSmall500={props.isSmall500}
              />
            </IconButton>
          </Link>
          <Box
            sx={{
              display: "flex",
              gap: props.isSmall500 ? "10px" : "30px",
              alignItems: "center",
              paddingTop: "5px",
            }}
          >
            <LinkButton
              to="/login"
              isSmall500={props.isSmall500}
              theme={props.theme}
            >
              Log In
            </LinkButton>
            <LinkButton
              to="/"
              isSmall500={props.isSmall500}
              theme={props.theme}
            >
              Start for free
            </LinkButton>
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
