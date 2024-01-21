import React, { Fragment } from "react";
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
                  fontSize: props.isSmall500 ? 40 : 90,
                  // fontSize: props.isSmall500 ? 90 : 60,
                  // fontWeight: 900,
                  fontWeight: 900,
                  // margin: "auto",
                  textAlign: "center",
                  // textAlign: "left",
                  letterSpacing: "-1px",
                  lineHeight: props.isSmall500 ? "50px" : "90px",
                  // textTransform: "uppercase",
                }}
              >
                Record and Review <br />
                your learning
              </Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{
                  // width: props.isSmall500 ? "90%" : "50%",
                  // margin: "auto",
                  margin: props.isSmall500 ? "20px 0px 20px" : "60px 0px 60px",
                  fontWeight: 400,
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  lineHeight: props.isSmall500 ? "20px" : "30px",
                  // fontSize: props.isSmall500 ? "14px" : "h6",
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
              }}
            >
              <Card
                sx={{
                  width: "80vw",
                  aspectRatio: "72/45",
                  backgroundImage: `url(${AppDisplay})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  // boxShadow: "5px 5px 20px 1px rgba(255, 255, 255, 0.2)",
                  // borderLeft: "3px solid rgba(255, 255, 255, 0.2)",
                  // borderTop: "3px solid rgba(255, 255, 255, 0.2)",
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
