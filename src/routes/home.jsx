import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Fragment>
      <Box sx={{ margin: "100px 50px 50px" }}>
        <Box
          // variant="h1"
          sx={{
            fontSize: 90,
            color: "var(--primary-color)",
            fontWeight: 900,
            textAlign: "center",
            letterSpacing: "-1px",
            lineHeight: "90px",
          }}
        >
          A tool for <br />
          Recording and Reviewing your learning
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "80%",
              margin: "auto",
              color: "var(--primary-color)",
              fontWeight: 500,
              textAlign: "center",
              letterSpacing: "0.5px",
              lineHeight: "25px",
            }}
          >
            Introducing the app, the ultimate solution for effortless Note
            Tracking. With my intuitive interface and powerful features, you can
            seamlessly record, organize, and review your notes like never
            before. Stay organized and in control with our user-friendly app,
            making note-taking a breeze.
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
}
