import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { FormHelperText } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithGoogle,
  database,
} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";

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

export default function Login() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // if (!email) {
      //   throw new Error("Please enter email");
      // }
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email)) {
      //   throw new Error("Please enter a valid email address");
      // }

      // if (password.length < 6) {
      //   throw new Error("Password must be at least six characters");
      // }

      await logInWithEmailAndPassword(auth, email, password);
      navigate("/application");
    } catch (error) {
      console.error("Login failed", error.message);
      alert("The account or password is wrong, please fill it in again.");
    }
  };

  const handleRegister = async () => {
    try {
      // if (!email) {
      //   throw new Error("Please enter email");
      // }
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email)) {
      //   throw new Error("Please enter a valid email address");
      // }

      // if (password.length < 6) {
      //   throw new Error("Password must be at least six characters");
      // }

      await registerWithEmailAndPassword(email, password);
      navigate("/application");
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
    navigate("/application");
  };

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  return (
    <Fragment>
      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
        <ThemeProvider theme={theme}>
          <Card
            sx={{
              width: "400px",
              height: "400px",
              margin: "100px auto",
              boxShadow: "none",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "40px 40px 20px",
              backgroundColor: "var(--background-color)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "var(--primary-color)",
                fontWeight: 900,
                whiteSpace: "nowrap",
                textAlign: "center",
                marginBottom: "-10px",
              }}
            >
              Let’s get started!
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "var(--primary-color)",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              Please confirm your email to continue
            </Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              color="primary"
              size="small"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              // focused
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="primary"
              size="small"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              // focused
            />

            <Stack
              spacing={4}
              direction="row"
              sx={{
                width: "100%",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ boxShadow: "none" }}
                onClick={handleLogin}
              >
                Log In
              </Button>
              <Typography
                variant="body"
                sx={{
                  color: "var(--primary-color)",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                or
              </Typography>
              <Button
                variant="contained"
                sx={{ boxShadow: "none" }}
                onClick={handleRegister}
              >
                Sign up
              </Button>
            </Stack>
            <Button
              variant="contained"
              sx={{ boxShadow: "none" }}
              onClick={handleSignInWithGoogle}
            >
              Log In With Google
            </Button>
          </Card>
        </ThemeProvider>
      </Box>
    </Fragment>
  );
}
