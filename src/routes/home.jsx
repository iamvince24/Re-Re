import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";

export default function Home(props) {
  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        <Box
          sx={{
            margin: props.isSmall500 ? "50px 20px 25px" : "100px 50px 50px",
          }}
        >
          <Typography
            color="primary"
            sx={{
              fontSize: props.isSmall500 ? 40 : 90,
              fontWeight: 900,
              // width: "80%",
              margin: "auto",
              // color: "var(--primary-color)",
              textAlign: "center",
              letterSpacing: "-1px",
              lineHeight: props.isSmall500 ? "50px" : "90px",
            }}
          >
            A tool for <br />
            Recording and Reviewing your learning
          </Typography>
          <Typography
            color="primary"
            variant="h6"
            sx={{
              width: props.isSmall500 ? "90%" : "80%",
              margin: "auto",
              marginTop: props.isSmall500 ? "20px" : "40px",
              // color: "var(--primary-color)",
              fontWeight: 500,
              textAlign: "center",
              letterSpacing: "0.5px",
              lineHeight: props.isSmall500 ? "20px" : "30px",
              fontSize: props.isSmall500 ? "14px" : "h6",
            }}
          >
            Introducing the app, the ultimate solution for effortless Note
            Tracking. With my intuitive interface and powerful features, you can
            seamlessly record, organize, and review your notes like never
            before. Stay organized and in control with our user-friendly app,
            making note-taking a breeze.
          </Typography>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
