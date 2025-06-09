import { Fragment, useState } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { months } from "../../../../utils/constants";
import { dayDiff } from "../../../../utils/dateFunctions";
import CustomSeparator from "../../../../component/common/CustomSeparator";
import GanttChart from "./component/GanttChart";
import DateRangePicker from "./component/DateRangePicker";
import { handleSidebarOpen } from "../../../../store/action";
import { useSelector } from "react-redux";

const barHeight = 70;
const drawerWidth = 350;

export default function GanttChartMode(props) {
  const { dispatch, theme } = props;
  const isSidebarOpen = useSelector((state) => state.viewListener.sidebarOpen);
  const screenSmall767 = useSelector(
    (state) => state.viewListener.screenWidth767
  );

  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: "2024",
    toSelectMonth: 11,
    toSelectYear: "2024",
  });

  const handleDrawerOpen = () => {
    dispatch(handleSidebarOpen(true));
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
        className="bgTexture"
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
            borderBottom: `1px solid ${theme.palette.dividerBorder.main}`,
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
                ...(isSidebarOpen && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: `${theme.palette.primary.main}` }} />
            </IconButton>
            <CustomSeparator theme={theme} />
          </Box>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 900,
              fontSize: "36px",
              color: `${theme.palette.primary.main}`,
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
              flexDirection: `${screenSmall767 ? "column" : "row"}`,
              justifyContent: `${
                screenSmall767 ? "flex-start" : "space-between"
              }`,
              alignItems: `${screenSmall767 ? "flex-start" : "center"}`,
            }}
          >
            <DateRangePicker
              theme={theme}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
            />
            <Button
              variant="contained"
              sx={{
                // background: "rgb(112, 132, 255, 0.1)",
                textTransform: "capitalize",
                color: `${theme.palette.secondary.main}`,
                height: "42px",
                padding: "0px 20px",
                marginTop: `${screenSmall767 ? "10px" : "0px"}`,
                letterSpacing: "0.5px",
                boxShadow: "none",
                fontWeight: 500,
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
          theme={theme}
          notebookData={props.notebookData}
          timeRange={timeRange}
        />
      </Box>
    </Fragment>
  );
}
