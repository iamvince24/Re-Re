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
import GanttImg from "../assets/img/GanttImg.png";
import NotebookImg from "../assets/img/NotebookImg.png";
import { red } from "@mui/material/colors";

export default function Home(props) {
  const { theme, isSmallScreenW500, isSmallScreenW767 } = props;
  const navigate = useNavigate();

  let marginTopInit = -250;
  if (isSmallScreenW767) {
    marginTopInit = -50;
  }

  const [scrollY, setScrollY] = useState(200);
  const [marginTop, setMarginTop] = useState(marginTopInit);
  const [width, setWidth] = useState(110);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const newScrollY = Math.max(0, 200 - window.scrollY);
      setScrollY(newScrollY);

      const temp = Math.max(marginTopInit, marginTopInit + window.scrollY);
      const newMarginTop = Math.min(50, Math.max(marginTopInit, temp));
      setMarginTop(newMarginTop);

      const newWidth = Math.min(110, Math.max(90, 110 - window.scrollY * 0.05));
      setWidth(newWidth);

      if (window.scrollY > lastScrollY) {
        setScrollY(newScrollY + 1);
        setMarginTop(newMarginTop + 1);
      } else {
        if (newScrollY >= 400) {
          setWidth(Math.min(110, newWidth + 1));
          setMarginTop(Math.max(marginTopInit, newMarginTop - 1));
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
        <div
          className="bgTexture"
          style={{
            padding: "100px 0px 50px",
            "@media (max-width:767px)": {
              padding: "50px 0px 50px",
            },
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
                  fontSize: "80px",
                  lineHeight: "90px",
                  letterSpacing: "-1px",
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                  textAlign: "center",
                  background:
                    "linear-gradient(151deg, #F4F4F3 1.35%, rgba(244, 244, 243, 0.00) 220.28%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  "@media (max-width:767px)": {
                    fontSize: "40px",
                    lineHeight: "40px",
                  },
                }}
              >
                Record and Review <br />
                your learning
              </Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{
                  width: "60%",
                  fontSize: "22.5px",
                  lineHeight: "35px",
                  margin: "60px 0px",
                  fontWeight: 400,
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  color: "rgba(200, 200, 200,.6)",
                  "@media (max-width:767px)": {
                    width: "80%",
                    fontSize: "14px",
                    lineHeight: "20px",
                    margin: "30px 0px",
                  },
                }}
              >
                "Introducing Re-Re, an application designed to assist you in
                recording and reviewing your study notes the ultimate solution
                for effortless note tracking."
              </Typography>
              <Button
                size="small"
                variant="contained"
                sx={{
                  color: `${theme.palette.secondary.main}`,
                  fontWeight: 700,
                  boxShadow: "none",
                  border: "none",
                  transition: "all 0.1s ease",
                  whiteSpace: "nowrap",
                  fontSize: isSmallScreenW500 ? "10px" : "small",
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "100px 0px",
              "@media (max-width:767px)": {
                margin: "0px 0px 50px",
              },
            }}
          >
            <Box
              sx={{
                width: "90%",
                maxWidth: "1280px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  "@media (max-width:767px)": {
                    width: "100%",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "40px",
                    letterSpacing: "-1px",
                    fontFamily: "Montserrat",
                    fontWeight: 900,
                    textAlign: "left",
                    background:
                      "linear-gradient(151deg, #F4F4F3 1.35%, rgba(244, 244, 243, 0.00) 220.28%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    "@media (max-width:767px)": {
                      fontSize: "25px",
                    },
                  }}
                >
                  Why Re-Re ?
                </Typography>
                <Typography
                  color="primary"
                  sx={{
                    fontSize: "22.5px",
                    lineHeight: "35px",
                    fontWeight: 400,
                    textAlign: "left",
                    letterSpacing: "0.5px",
                    color: "rgba(200, 200, 200,.6)",
                    "@media (max-width:767px)": {
                      fontSize: "14px",
                      lineHeight: "20px",
                    },
                  }}
                >
                  "Introduce an application, Re-Re, that helps you record and
                  review in your study, the ultimate solution for effortless
                  note tracking.Introduce an application, Re-Re, that helps you
                  record and review in your study, the ultimate solution for
                  effortless note tracking."
                </Typography>
                <div
                  style={{
                    width: "100%",
                    display: isSmallScreenW767 ? "flex" : "none",
                    justifyContent: "center",
                    margin: "30px 0px",
                  }}
                >
                  <Card
                    sx={{
                      display: isSmallScreenW767 ? "flex" : "none",
                      width: "30%",
                      minWidth: "200px",
                      aspectRatio: "486/352",
                      backgroundImage: `url(${NotebookImg})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      "@media (max-width:767px)": {
                        minWidth: "150px",
                      },
                    }}
                  />
                </div>
                <Typography
                  color="primary"
                  sx={{
                    fontSize: "22.5px",
                    lineHeight: "35px",
                    fontWeight: 400,
                    textAlign: "left",
                    letterSpacing: "0.5px",
                    color: "rgba(200, 200, 200,.6)",
                    "@media (max-width:767px)": {
                      fontSize: "14px",
                      lineHeight: "20px",
                    },
                  }}
                >
                  {" "}
                  "Introduce an application, Re-Re, that helps you record and
                  review in your study, the ultimate solution for effortless
                  note tracking.Introduce an application, Re-Re, that helps you
                  record and review in your study, the ultimate solution for
                  effortless note tracking."
                </Typography>
              </Box>
              <Card
                sx={{
                  display: isSmallScreenW767 ? "none" : "flex",
                  width: "30%",
                  marginTop: "30px",
                  aspectRatio: "486/352",
                  backgroundImage: `url(${NotebookImg})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              />
            </Box>
            <Card
              sx={{
                width: "60%",
                aspectRatio: "1233/370",
                margin: "120px 0px",
                backgroundImage: `url(${GanttImg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "transparent",
                boxShadow: "none",
                "@media (max-width:767px)": {
                  width: "70%",
                  margin: "50px 0px",
                },
                "@media (max-width:400px)": {
                  width: "80%",
                },
              }}
            />
          </Box>
          <LabTabs theme={theme} isSmallScreenW500={isSmallScreenW500} />
          <SmallFunction theme={theme} isSmallScreenW500={isSmallScreenW500} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="small"
              variant="contained"
              sx={{
                color: `${theme.palette.secondary.main}`,
                fontWeight: 700,
                boxShadow: "none",
                border: "none",
                transition: "all 0.1s ease",
                whiteSpace: "nowrap",
                fontSize: isSmallScreenW500 ? "10px" : "small",
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
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            id="targetAbout"
          >
            <Logo
              theme={theme}
              isSmallScreenW500={isSmallScreenW500}
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
                lineHeight: isSmallScreenW500 ? "20px" : "20px",
                fontSize: isSmallScreenW500 ? "14px" : "1rem",
                color: "rgba(200, 200, 200,.6)",
              }}
            >
              © All Rights Reserved.
            </Typography>
          </div>
        </div>
      </ThemeProvider>
    </Fragment>
  );
}
