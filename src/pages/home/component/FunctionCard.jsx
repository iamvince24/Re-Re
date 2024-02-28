import React, { Fragment, lazy, Suspense } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// import ModeChange from "../../../assets/img/ModeChange.png";
// import DatePicker from "../../../assets/img/DatePicker.png";
// import TimelineColor from "../../../assets/img/TimelineColor.png";
// import TimeRangePicker from "../../../assets/img/TimeRangePicker.png";

import ModeChange from "../../../assets/img/ModeChange.webp";
import DatePicker from "../../../assets/img/DatePicker.webp";
import TimelineColor from "../../../assets/img/TimelineColor.webp";
import TimeRangePicker from "../../../assets/img/TimeRangePicker.webp";

const LazyCard = React.lazy(() => import("@mui/material/Card"));

const FunctionCardSection = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 150px 0 0;

  @media (max-width: 767px) {
    margin: 100px 0 0;
  }
`;

const FunctionCardTitle = styled("div")`
  font-size: 40px;
  letter-spacing: -1px;
  font-family: Montserrat;
  font-weight: 900;
  margin: 0 0 40px;
  text-align: center;
  background: linear-gradient(
    151deg,
    #f4f4f3 1.35%,
    rgba(244, 244, 243, 0) 220.28%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 767px) {
    font-size: 25px;
    margin: 0 0 20px;
    line-height: 25px;
  }
`;

const FunctionCardSubtitle = styled("div")`
  width: 70%;
  margin: 0 0 20px;
  font-size: 22.5px;
  line-height: 35px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.5px;
  color: rgba(200, 200, 200, 0.6);

  @media (max-width: 767px) {
    width: 80%;
    font-size: 14px;
    line-height: 20px;
  }
`;

export default function FunctionCard(props) {
  const { theme, handleTryOnWebsite } = props;

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
        <FunctionCardSection>
          <FunctionCardTitle>
            User-friendly and convenient tool
          </FunctionCardTitle>
          <FunctionCardSubtitle>
            The following small functions can help you adjust and view various
            progress of Gantt more conveniently and clearly.
          </FunctionCardSubtitle>
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
                <Suspense fallback={<div>Loading...</div>} key={card.name}>
                  <LazyCard
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
                  </LazyCard>
                </Suspense>
              );
            })}
          </Box>
        </FunctionCardSection>
        <Box
          sx={{
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
              fontSize: "small",
              margin: "50px auto",
              "@media (max-width:500px)": {
                fontSize: "10px",
              },
            }}
            color="primary"
            onClick={handleTryOnWebsite}
          >
            Try on Website
          </Button>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
