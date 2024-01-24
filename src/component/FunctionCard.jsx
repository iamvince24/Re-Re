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
          }}
          id="targetHeading"
        >
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: "50px",
              fontWeight: 900,
              fontFamily: "Montserrat",
              background:
                "linear-gradient(151deg, #F4F4F3 1.35%, rgba(244, 244, 243, 0.00) 220.28%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Convenient little tool
          </Typography>
          <Typography
            color="primary"
            sx={{
              margin: props.isSmall500 ? "10px 0px 20px" : "20px 0px 40px",
              fontWeight: 400,
              textAlign: "center",
              letterSpacing: "0.5px",
              lineHeight: props.isSmall500 ? "20px" : "30px",
              fontSize: props.isSmall500 ? "14px" : "1.25rem",
              color: "rgba(200, 200, 200,.6)",
            }}
          >
            The following small functions can help you adjust <br />
            and view various progress of Gantt more conveniently and clearly.
          </Typography>
          <Box
            sx={{
              width: "75vw",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {cardInformation.map((card) => {
              return (
                <Card
                  key={card.name}
                  sx={{
                    width: "470px",
                    height: "300px",
                    bgcolor: "rgba(155, 155, 155, 0.2)",
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "10px",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    color="primary"
                    textAlign={"left"}
                    sx={{
                      fontSize: "22.5px",
                      fontWeight: 700,
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
                      margin: "5px 0px 10px",
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
