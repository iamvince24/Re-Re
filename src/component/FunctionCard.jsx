import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ModeChange from "../assets/img/ModeChange.png";
import DatePicker from "../assets/img/DatePicker.png";
import TimelineColor from "../assets/img/TimelineColor.png";
import TimeRangePicker from "../assets/img/TimeRangePicker.png";
import NoteBookStructure from "../assets/img/NoteBookStructure.png";

export default function SmallFunction(props) {
  const { theme } = props;

  const cardInformation = [
    {
      name: "Mode Change",
      url: `${ModeChange}`,
      introduction:
        "By using the Notebook and Gantt buttons, you can switch between Notebook mode and Gantt mode.",
      position: "bottom",
    },
    {
      name: "Notebook Date Picker",
      url: `${DatePicker}`,
      introduction:
        "By using the Date Picker in Notebook Mode, you can change the time range of Durations in the Gantt.",
      position: "bottom",
    },
    {
      name: "Change Durations Color",
      url: `${TimelineColor}`,
      introduction:
        "You can change the color of Durations by right-clicking on it in Gantt.",
      position: "bottom",
    },
    {
      name: "Change Time Range",
      url: `${TimeRangePicker}`,
      introduction:
        "You can change the time display range of the Gantt chart by using the TimeRange Picker in Gantt Mode.",
      position: "bottom",
    },
  ];

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "150px 0px 0px",
            "@media (max-width:767px)": {
              margin: "100px 0px 0px",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              letterSpacing: "-1px",
              fontFamily: "Montserrat",
              fontWeight: 900,
              margin: "0px 0px 40px",
              textAlign: "center",
              background:
                "linear-gradient(151deg, #F4F4F3 1.35%, rgba(244, 244, 243, 0.00) 220.28%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              "@media (max-width:767px)": {
                fontSize: "25px",
                margin: "0px 0px 20px",
                lineHeight: "25px",
              },
            }}
          >
            User-friendly and convenient tool
          </Typography>
          <Typography
            color="primary"
            sx={{
              width: "70%",
              margin: "0px 0px 20px",
              fontSize: "22.5px",
              lineHeight: "35px",
              fontWeight: 400,
              textAlign: "center",
              letterSpacing: "0.5px",
              color: "rgba(200, 200, 200, 0.6)",
              "@media (max-width:767px)": {
                width: "80%",
                fontSize: "14px",
                lineHeight: "20px",
              },
              "@media (max-width:500px)": {
                width: "280px",
              },
            }}
          >
            The following small functions can help you adjust and view various
            progress of Gantt more conveniently and clearly.
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "1000px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              "@media (max-width:767px)": {
                width: "100%",
              },
            }}
          >
            {cardInformation.map((card) => {
              return (
                <Card
                  key={card.name}
                  sx={{
                    width: "480px",
                    height: "300px",
                    bgcolor: "rgba(155, 155, 155, 0.2)",
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "10px",
                    boxShadow: "none",
                    "@media (max-width:767px)": {
                      margin: "auto 20px",
                      height: "250px",
                    },
                    "@media (max-width:400px)": {
                      width: "90vw",
                      margin: "auto",
                      minHeight: "250px",
                    },
                  }}
                >
                  <Typography
                    color="primary"
                    textAlign={"left"}
                    sx={{
                      fontSize: "22.5px",
                      fontWeight: 700,
                      "@media (max-width:767px)": {
                        fontSize: "18px",
                      },
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Typography
                    color="primary"
                    textAlign={"left"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "rgba(200, 200, 200, 0.6)",
                      margin: "5px 0px 10px",
                      "@media (max-width:767px)": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    {card.introduction}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(155, 155, 155, 0.2)",
                      backgroundImage: `url(${card.url})`,
                      backgroundSize: "80%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${card.position}`,
                      borderRadius: "5px",
                    }}
                  ></Box>
                </Card>
              );
            })}
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
