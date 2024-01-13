import { Fragment, useState } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CustomSeparator from "./CustomSeparator";
import DatePickerValue from "./DatePickerValue";
import TextareaRef from "./TextareaRef";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { months } from "../utils/constants";
import { dayDiff } from "../utils/dateFunctions";

import { useSpring, animated } from "react-spring";
import GanttChart from "./GanttChart/GanttChart";
import DateRangePicker from "./DateRangePicker";

const barHeight = 70;
const drawerWidth = 350;

export default function GanntMode(props) {
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: "2024",
    toSelectMonth: 11,
    toSelectYear: "2024",
  });

  const handleDrawerOpen = () => {
    props.setOpen(true);
  };

  const handleGanttMoveToday = () => {
    const scrollingContainer = document.getElementById(
      "gantt-grid-container__time"
    );

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedToday = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    const startDate = `${timeRange.fromSelectYear}-${
      months[timeRange.fromSelectMonth]
    }-01`;

    scrollingContainer.scrollLeft =
      (dayDiff(startDate, formattedToday) - 2) * 30;
  };

  return (
    <Fragment>
      <Box
        sx={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            // height: "180px",
            height: "auto",
            padding: "0px 20px 20px",
            borderBottom: `3px solid ${props.theme.palette.dividerBorder.main}`,
          }}
        >
          <Box sx={{ height: "70px", display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                ...(props.open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: `${props.theme.palette.primary.main}` }} />
            </IconButton>
            <CustomSeparator
              theme={props.theme}
              notebookData={props.notebookData}
              notebookDisplay={props.notebookDisplay}
              mode={props.mode}
            />
          </Box>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 900,
              // typography: "h1",
              fontSize: "36px",
              color: `${props.theme.palette.primary.main}`,
              textTransform: "capitalize",
              textAlign: "left",
              marginTop: "-12.5px",
            }}
          >
            GanttMode
          </Typography>
          <Box
            sx={{
              textAlign: "left",
              display: "flex",
              flexDirection: `${props.isSmallScreen ? "column" : "row"}`,
              justifyContent: `${
                props.isSmallScreen ? "flex-start" : "space-between"
              }`,
              alignItems: `${props.isSmallScreen ? "flex-start" : "center"}`,
              marginTop: "35px",
            }}
          >
            <DateRangePicker
              theme={props.theme}
              notebookData={props.notebookData}
              notebookDisplay={props.notebookDisplay}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
            />
            <Button
              variant="contained"
              sx={{
                // background: "rgb(112, 132, 255, 0.1)",
                textTransform: "capitalize",
                color: `${props.theme.palette.secondary.main}`,
                height: "42px",
                padding: "0px 20px",
                marginTop: `${props.isSmallScreen ? "10px" : "0px"}`,
                letterSpacing: "0.5px",
                boxShadow: "none",
                fontWeight: 700,
              }}
              onClick={() => {
                handleGanttMoveToday();
              }}
            >
              Today
            </Button>
          </Box>
        </Box>

        <GanttChart
          theme={props.theme}
          notebookData={props.notebookData}
          notebookDisplay={props.notebookDisplay}
          timeRange={timeRange}
          isSmallScreen={props.isSmallScreen}
        />
      </Box>
    </Fragment>
  );
}
