import React, { Fragment, useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import LabTabs from "./component/LabTabs";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Logo from "../../assets/img/logo";
import Skeleton from "@mui/material/Skeleton";
import { debounce } from "lodash";

import SmallFunction from "./component/FunctionCard";

import { handleNewUserData } from "../../firebase";

import AppImg from "../../assets/img/app.png";
import GanttImg from "../../assets/img/GanttImg.png";
import NotebookImg from "../../assets/img/NotebookImg.png";

export default function Home(props) {
  const { theme, isSmallScreenW500 } = props;
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(100);
  const [scale, setScale] = useState(1.15);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const newScrollY = Math.max(0, 100 - window.scrollY * 0.5);
      setScrollY(newScrollY);

      const newScale = Math.min(
        1.15,
        Math.max(0.9, 1.15 - window.scrollY * 0.25)
      );
      setScale(newScale);

      if (window.scrollY > lastScrollY) {
        setScrollY(newScrollY + 1);
      } else {
        if (newScrollY >= 400) {
          setScale(Math.min(1.15, newScale + 0.5));
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

  const handleTryOnWebsite = debounce(async () => {
    try {
      const uid = generateRandomString();
      window.localStorage.setItem("uid", uid);
      await handleNewUserData(uid);
      navigate("/application");
    } catch (error) {
      console.error("Login failed", error.message);
      alert("The account or password is wrong, please fill it in again.");
    }
  }, 500);

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
          className="bgTexture"
          sx={{
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
                  width: "90%",
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
                "Introducing Re-Re, an application meticulously crafted to aid
                you in recording and reviewing your study notes."
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
                width: "80%",
                background: "rgb(200, 200, 200, 0.05)",
                borderRadius: "5px",
                transform: `perspective(1000px) rotateX(${perspectiveValue}deg) scale(${scale})`,
                transformOrigin: "center bottom",
                transition: "transform 0.5s ease, margin-top 0.5s ease",
                marginTop: "40px",
                marginBottom: "150px",
                position: "relative",
                boxShadow: "0px 0px 50px 10px rgba(200, 200, 200, 0.2)",
                "@media (max-width:1000px)": {
                  marginTop: "50px",
                },
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  aspectRatio: "72/45",
                  backgroundImage: `url(${AppImg})`,
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
            id="targetWhy"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "100px 0px",
              "@media (max-width:767px)": {
                margin: "0px 0px 100px",
              },
            }}
          >
            <Box
              sx={{
                width: "90%",
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
                  "@media (max-width:1200px)": {
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
                  "In modern note-taking tools, whether it's paper or software,
                  most of them cannot record the time spent on learning
                  something. Additionally, each note usually only records the
                  starting time and editing time in a point-like manner, which
                  is relatively non-intuitive when faced with a large number of
                  notes. However, we believe that recording learning time is
                  very helpful for one's own learning, especially in this era of
                  information explosion.&nbsp;
                  <span
                    style={{
                      color: "rgba(200, 200, 200, 0.9)",
                      fontWeight: 600,
                    }}
                  >
                    For people who need to absorb a large amount of different
                    information, evaluating their own learning situation and
                    finding the best learning method and the time spent on it
                    are important investments that can improve efficiency.
                  </span>
                  &nbsp; However, currently there is no software that can help
                  record both notes and time, and this is exactly what we want
                  to achieve."
                  <br />
                  <br />
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "none",
                    justifyContent: "center",
                    margin: "30px 0px",
                    "@media (max-width:1200px)": {
                      display: "flex",
                    },
                  }}
                >
                  <Suspense
                    fallback={
                      <Skeleton
                        variant="rounded"
                        // width={"30%"}
                        // height={"auto"}
                        sx={{
                          width: "30%",
                          height: "auto",
                          aspectRatio: "486/352",
                        }}
                      />
                    }
                  >
                    <Card
                      sx={{
                        display: "flex",
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
                  </Suspense>
                </Box>
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
                  "Re-Re is a time management learning software. By displaying
                  the time intervals spent on each note on a Gantt chart, users
                  can clearly understand their learning progress during each
                  time period in the past.&nbsp;
                  <span
                    style={{
                      color: "rgba(200, 200, 200, 0.9)",
                      fontWeight: 600,
                    }}
                  >
                    The biggest advantage of this software is its ability to
                    utilize past learning assessments to effectively plan future
                    learning content, making it more systematic and tailored to
                    individual needs.
                  </span>
                  &nbsp; We hope that every user can make full use of their past
                  learning experiences while continuously learning."
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  "@media (max-width:1200px)": {
                    display: "none",
                  },
                }}
              >
                <Card
                  sx={{
                    width: "70%",
                    maxWidth: "500px",
                    margin: "0px auto 0px",
                    marginRight: "30px",
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "100px",
            }}
          >
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
                fontSize: "1rem",
                color: "rgba(200, 200, 200,.6)",
                "@media (max-width:767px)": {
                  marginTop: "10px",
                  fontSize: "14px",
                },
              }}
            >
              © All Rights Reserved.
            </Typography>
          </div>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
