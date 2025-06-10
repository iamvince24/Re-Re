import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { ThemeProvider, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

interface LoginProps {
  theme: Theme;
  isSmallScreenW500: boolean;
}

export default function Login(props: LoginProps) {
  const { theme, isSmallScreenW500 } = props;
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");

  const [user, loading] = useAuthState(auth) as [User | null, boolean, Error | undefined];
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await logInWithEmailAndPassword(auth, email, password);
      navigate("/application");
    } catch (error: any) {
      console.error("Login failed", error.message);
      alert("The account or password is wrong, please fill it in again.");
    }
  };

  const handleRegister = async () => {
    try {
      await registerWithEmailAndPassword(email, password);
      navigate("/application");
    } catch (error: any) {
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
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
          <Card
            sx={{
              width: isSmallScreenW500 ? 290 : 345,
              height: isSmallScreenW500 ? 350 : 390,
              margin: isSmallScreenW500 ? "60px auto" : "100px auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: isSmallScreenW500 ? "20px 20px 10px" : "40px 40px 20px",
              backgroundColor: `${theme.palette.primary.main}`,
            }}
          >
            <Typography
              color="secondary"
              sx={{
                fontSize: isSmallScreenW500 ? 20 : 25,
                fontWeight: 900,
                whiteSpace: "nowrap",
                textAlign: "center",
                marginBottom: "-10px",
              }}
            >
              Let’s get started!
            </Typography>
            <Typography
              color="secondary"
              variant="caption"
              sx={{
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
              color="secondary"
              size="small"
              defaultValue={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="secondary"
              size="small"
              defaultValue={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <Stack
              direction="row"
              sx={{
                width: "100%",
                margin: isSmallScreenW500 ? "5px 0px 5px" : "10px 0px 5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  boxShadow: "none",
                  color: "var(--primary-color)",
                  fontWeight: 700,
                  fontSize: isSmallScreenW500 ? "10px" : "small",
                }}
                onClick={handleRegister}
              >
                Sign up
              </Button>
              <Typography
                color="secondary"
                variant="body1"
                sx={{
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                or
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  boxShadow: "none",
                  color: "var(--primary-color)",
                  fontWeight: 700,
                  fontSize: isSmallScreenW500 ? "10px" : "small",
                }}
                onClick={handleLogin}
              >
                Log In
              </Button>
            </Stack>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                boxShadow: "none",
                color: "var(--primary-color)",
                fontWeight: 700,
                fontSize: isSmallScreenW500 ? "10px" : "small",
              }}
              onClick={handleSignInWithGoogle}
            >
              Log In With Google
            </Button>
          </Card>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
