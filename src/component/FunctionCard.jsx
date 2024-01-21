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
      position: "bottom",
    },
    {
      name: "Date Picker",
      url: `${DatePicker}`,
      position: "bottom",
    },
    {
      name: "Change Timeline Color",
      url: `${TimelineColor}`,
      position: "bottom",
    },
    {
      name: "TimeRangePicker",
      url: `${TimeRangePicker}`,
      position: "bottom",
    },
    {
      name: "NoteBook Structure",
      url: `${NoteBookStructure}`,
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
            margin: "150px 0px 300px",
          }}
        >
          <Typography
            color="primary"
            textAlign={"center"}
            sx={{ fontSize: "50px", fontWeight: 900, margin: "10px 0px 0px" }}
          ></Typography>
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
                  }}
                >
                  <Typography
                    color="primary"
                    textAlign={"left"}
                    sx={{
                      fontSize: "25px",
                      fontWeight: 700,
                      marginBottom: "5px",
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Typography
                    color="primary"
                    textAlign={"left"}
                    sx={{
                      fontSize: "15px",
                      fontWeight: 500,
                      margin: "10px 0px",
                    }}
                  >
                    Introducing the app, the ultimate solution for effortless
                    Note Tracking.
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
