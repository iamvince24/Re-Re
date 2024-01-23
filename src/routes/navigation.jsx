import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import Logo from "../assets/img/logo";
import IconButton from "@mui/material/IconButton";
import { LinkButton } from "../component/Button";
import Typography from "@mui/material/Typography";

export default function Navigation(props) {
  const { scrollToHeading } = props;

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
            // background:
            //   "linear-gradient(90deg, rgba(217, 217, 217, 0.20) 0%, rgba(217, 217, 217, 0.00) 100%)",
            // borderBottom: "1.5px solid var(--primary-color)",
            backdropFilter: "blur(100px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: props.isSmall500 ? "10px" : "30px",
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
                <Logo theme={props.theme} isSmall500={props.isSmall500} />
              </IconButton>
            </Link>
            <div
              style={{
                marginTop: "2.5px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: props.isSmall500 ? "10px" : "30px",
              }}
            >
              <MuiLink
                // href="/"
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={scrollToHeading}
              >
                Features
              </MuiLink>

              <MuiLink
                href="/"
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                About
              </MuiLink>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: props.isSmall500 ? "10px" : "30px",
              alignItems: "center",
              paddingTop: "5px",
              background: "none",
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
              Try on Website
            </LinkButton>
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
