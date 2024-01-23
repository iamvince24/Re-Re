import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import Logo from "../assets/img/logo";
import IconButton from "@mui/material/IconButton";
import { LinkButton } from "../component/Button";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";
import { handleNewUserData } from "../firebase";
import Button from "@mui/material/Button";

export default function Navigation(props) {
  const { scrollToHeading } = props;

  const navigate = useNavigate();

  const handleTryOnWebsite = async () => {
    try {
      const uid = generateRandomString();
      window.localStorage.setItem("uid", uid);
      await handleNewUserData(uid);
      navigate("/application");
    } catch (error) {
      console.error("Login failed", error.message);
      alert("The account or password is wrong, please fill it in again.");
    }
  };

  function generateRandomString() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

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
                <Logo
                  theme={props.theme}
                  isSmall500={props.isSmall500}
                  color={"primary"}
                  height={183}
                  width={237}
                />
              </IconButton>
            </Link>
            <div
              style={{
                marginTop: props.isSmall500 ? "7px" : "2.5px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: props.isSmall500 ? "10px" : "30px",
              }}
            >
              <MuiLink
                href="/"
                sx={{
                  fontSize: props.isSmall500 ? "12px" : "14px",
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
                  fontSize: props.isSmall500 ? "12px" : "14px",
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
            <Button
              size="small"
              variant="contained"
              sx={{
                color: `${props.theme.palette.secondary.main}`,
                fontWeight: 700,
                boxShadow: "none",
                border: "none",
                transition: "all 0.1s ease",
                whiteSpace: "nowrap",
                fontSize: props.isSmall500 ? "8px" : "10px",
              }}
              color="primary"
              onClick={handleTryOnWebsite}
            >
              Try on Website
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
