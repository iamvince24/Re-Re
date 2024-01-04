import { Fragment } from "react";
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

import { useSpring, animated } from "react-spring";
import GanttChart from "./GanttChart/GanttChart";

const barHeight = 70;
const drawerWidth = 350;

export default function GanntMode(props) {
  const handleDrawerOpen = () => {
    props.setOpen(true);
  };

  return (
    <Fragment>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            // height: "180px",
            height: "auto",
            // padding: "0px 20px 20px",
            padding: "0px 20px 0px",
            borderBottom: "3px solid #F2D4CC",
            marginBottom: "25px",
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
              <MenuIcon sx={{ color: "#2E4AF3" }} />
            </IconButton>
            <CustomSeparator
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
              color: "#2E4AF3",
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
              // display: "flex",
              display: "none",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DatePickerValue
              notebookData={props.notebookData}
              notebookDisplay={props.notebookDisplay}
            />
            <Button
              sx={{
                background: "rgb(112, 132, 255, 0.1)",
                textTransform: "capitalize",
                color: "#2E4AF3",
                height: "42px",
                padding: "0px 15px",
                marginTop: "-10px",
                letterSpacing: "0.5px",
              }}
            >
              To Editor
            </Button>
          </Box>
        </Box>

        <GanttChart
          notebookData={props.notebookData}
          notebookDisplay={props.notebookDisplay}
        />
      </Box>
    </Fragment>
  );
}
