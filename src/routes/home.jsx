import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import LabTabs from "../component/LabTabs";
import SmallFunction from "../component/FunctionCard";
import appPic from "../assets/img/app.png";
import AppDisplay from "../assets/img/AppDisplay.png";
import Card from "@mui/material/Card";
import { handleNewUserData } from "../firebase";
import Button from "@mui/material/Button";
import Logo from "../assets/img/logo";

export default function Home(props) {
  const { theme } = props;

  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(200);
  const [marginTop, setMarginTop] = useState(-250);
  const [width, setWidth] = useState(110);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const newScrollY = Math.max(0, 200 - window.scrollY);
      setScrollY(newScrollY);

      const temp = Math.max(-250, -250 + window.scrollY);
      const newMarginTop = Math.min(50, Math.max(-250, temp));
      setMarginTop(newMarginTop);

      const newWidth = Math.min(110, Math.max(90, 110 - window.scrollY * 0.05));
      setWidth(newWidth);

      if (window.scrollY > lastScrollY) {
        setScrollY(newScrollY + 1);
        setMarginTop(newMarginTop + 1);
      } else {
        if (newScrollY >= 400) {
          setWidth(Math.min(110, newWidth + 1));
          setMarginTop(Math.max(-250, newMarginTop - 1));
        }
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const perspectiveValue = scrollY * 0.1;

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
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: "100px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                color="primary"
                sx={{
                  display: "flex",
                  fontSize: props.isSmall500 ? 40 : 80,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                  textAlign: "center",
                  letterSpacing: "-1px",
                  lineHeight: props.isSmall500 ? "50px" : "90px",
                  background:
                    "linear-gradient(151deg, #F4F4F3 1.35%, rgba(244, 244, 243, 0.00) 220.28%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Record and Review <br />
                your learning
              </Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{
                  width: "800px",
                  margin: props.isSmall500 ? "20px 0px 20px" : "60px 0px 60px",
                  fontWeight: 400,
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  lineHeight: props.isSmall500 ? "20px" : "30px",
                  fontSize: props.isSmall500 ? "14px" : "1.5rem",
                  color: "rgba(200, 200, 200,.6)",
                }}
              >
                "Introducing Re-Re, an application designed to assist you in
                recording and reviewing your study notes <br /> the ultimate
                solution for effortless note tracking."
              </Typography>
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
                  fontSize: props.isSmall500 ? "10px" : "small",
                  margin: "0px 0px 30px",
                }}
                color="primary"
                onClick={handleTryOnWebsite}
              >
                Try on Website
              </Button>
            </Box>
            <Box
              sx={{
                // padding: "7.5px",
                background: "rgb(200, 200, 200, 0.05)",
                borderRadius: "5px",
                transform: `perspective(1000px) rotateX(${perspectiveValue}deg)`,
                transformOrigin: "center bottom",
                transition: "transform 0.5s ease, margin-top 0.5s ease",
                marginTop: `${marginTop}px`,
                marginBottom: "150px",
                position: "relative",
                boxShadow: "0px 0px 50px 10px rgba(200, 200, 200, 0.2)",
              }}
            >
              <Card
                sx={{
                  width: `${width}vw`,
                  aspectRatio: "72/45",
                  backgroundImage: `url(${appPic})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              />
            </Box>
          </Box>
        </Box>
        <LabTabs theme={theme} />
        <SmallFunction theme={theme} />
        <div style={{ display: "flex", justifyContent: "center" }}>
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
              fontSize: props.isSmall500 ? "10px" : "small",
              margin: "50px auto",
            }}
            color="primary"
            onClick={handleTryOnWebsite}
          >
            Try on Website
          </Button>
        </div>
        <div
          style={{
            margin: "100px auto 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo
            theme={props.theme}
            isSmall500={props.isSmall500}
            color={"secondary"}
            height={150}
            width={276}
          />
          <Typography
            textAlign={"left"}
            color="primary"
            sx={{
              margin: "auto",
              fontWeight: 400,
              letterSpacing: "0.5px",
              lineHeight: props.isSmall500 ? "20px" : "20px",
              fontSize: props.isSmall500 ? "14px" : "1rem",
              color: "rgba(200, 200, 200,.6)",
            }}
          >
            © All Rights Reserved.
          </Typography>
        </div>
      </ThemeProvider>
    </Fragment>
  );
}
