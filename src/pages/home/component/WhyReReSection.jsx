import React, { lazy, Suspense } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

// import NotebookImg from "../../../assets/img/NotebookImg.png";
// import GanttImg from "../../../assets/img/GanttImg.png";

import NotebookImg from "../../../assets/img/NotebookImg.webp";
import GanttImg from "../../../assets/img/GanttImg.webp";

const LazyCard = React.lazy(() => import("@mui/material/Card"));

const WhyReReSection = () => {
  return (
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
            "In modern note-taking tools, whether it's paper or software, most
            of them cannot record the time spent on learning something.
            Additionally, each note usually only records the starting time and
            editing time in a point-like manner, which is relatively
            non-intuitive when faced with a large number of notes. However, we
            believe that recording learning time is very helpful for one's own
            learning, especially in this era of information explosion.&nbsp;
            <span
              style={{
                color: "rgba(200, 200, 200, 0.9)",
                fontWeight: 600,
              }}
            >
              For people who need to absorb a large amount of different
              information, evaluating their own learning situation and finding
              the best learning method and the time spent on it are important
              investments that can improve efficiency.
            </span>
            &nbsp; However, currently there is no software that can help record
            both notes and time, and this is exactly what we want to achieve."
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
                  sx={{
                    width: "30%",
                    height: "auto",
                    aspectRatio: "486/352",
                  }}
                />
              }
            >
              <LazyCard
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
            "Re-Re is a time management learning software. By displaying the
            time intervals spent on each note on a Gantt chart, users can
            clearly understand their learning progress during each time period
            in the past.&nbsp;
            <span
              style={{
                color: "rgba(200, 200, 200, 0.9)",
                fontWeight: 600,
              }}
            >
              The biggest advantage of this software is its ability to utilize
              past learning assessments to effectively plan future learning
              content, making it more systematic and tailored to individual
              needs.
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
          <Suspense fallback={<div>Loading...</div>}>
            <LazyCard
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
          </Suspense>
        </Box>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyCard
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
      </Suspense>
    </Box>
  );
};

export default WhyReReSection;
