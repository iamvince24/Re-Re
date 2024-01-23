import React, { Fragment, useState, useEffect } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import LabTabs from "../component/LabTabs";
import SmallFunction from "../component/FunctionCard";
import appPic from "../assets/img/app.png";
import AppDisplay from "../assets/img/AppDisplay.png";
import Card from "@mui/material/Card";

export default function Home(props) {
  const { theme } = props;

  const [scrollY, setScrollY] = useState(200);
  const [marginTop, setMarginTop] = useState(-250);
  const [width, setWidth] = useState(110);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const newScrollY = Math.max(0, 200 - window.scrollY);
      setScrollY(newScrollY);

      const temp = Math.max(-250, -250 + window.scrollY);
      const newMarginTop = Math.min(0, Math.max(-250, temp));
      setMarginTop(newMarginTop);

      const newWidth = Math.min(110, Math.max(90, 110 - window.scrollY * 0.05));
      setWidth(newWidth);

      if (window.scrollY > lastScrollY) {
        setScrollY(newScrollY + 1);
        setMarginTop(newMarginTop + 1);
        // setWidth(90);
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

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            margin: props.isSmall500 ? "50px 20px 25px" : "80px 50px 50px",
            backgroundColor: "red",
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
                  fontSize: props.isSmall500 ? 40 : 90,
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                  textAlign: "center",
                  letterSpacing: "-1px",
                  lineHeight: props.isSmall500 ? "50px" : "100px",
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
                  margin: props.isSmall500 ? "20px 0px 20px" : "60px 0px 60px",
                  fontWeight: 400,
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  lineHeight: props.isSmall500 ? "20px" : "30px",
                  fontSize: props.isSmall500 ? "14px" : "1.5rem",
                  color: "rgba(200, 200, 200,.6)",
                }}
              >
                Re-Re is a tool for recording and reviewing your learning,
                <br /> the ultimate solution for effortless Note Tracking
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "7.5px",
                background: "rgb(200, 200, 200, 0.05)",
                borderRadius: "5px",
                transform: `perspective(1000px) rotateX(${perspectiveValue}deg)`,
                transformOrigin: "center bottom",
                transition: "transform 0.5s ease, margin-top 0.5s ease",
                marginTop: `${marginTop}px`,
              }}
            >
              <Card
                sx={{
                  // width: "90vw",
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
      </ThemeProvider>
    </Fragment>
  );
}
