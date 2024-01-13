import { Fragment, useState, useEffect } from "react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { getDatabase, ref, set, child, push, update } from "firebase/database";

import Notebook from "./notebook";
import { logout } from "../firebase";

function writeNewPost(uid, id) {
  const db = getDatabase();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  // Create a Date object for the current date
  const defaultStartDate = new Date(year, month - 1, day);

  // Create a Date object for the end date and add one day
  const defaultEndDate = new Date(year, month - 1, day);
  defaultEndDate.setDate(defaultEndDate.getDate() + 1);

  // Format dates as strings
  const formattedStartDate = formatDate(defaultStartDate);
  const formattedEndDate = formatDate(defaultEndDate);

  // A post entry.
  const postData = {
    id: id,
    name: "Default Notebook",
    start: formattedStartDate,
    end: formattedEndDate,
    Chapters: [
      {
        id: id,
        name: "Default Chapter",
        start: formattedStartDate,
        end: formattedEndDate,
        content: "Type something",
      },
    ],
  };

  const newPostKey = id;
  const updates = {};
  updates["/users/" + uid + "/notebooks/" + newPostKey] = postData;

  return update(ref(db), updates);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

export default function Menu(props) {
  const [notebookList, setNotebookList] = useState(props.notebookData);
  const navigate = useNavigate();
  const username = window.localStorage.getItem("username");

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  const handleAddNotebook = () => {
    writeNewPost(
      props.uid,
      props.notebookData[props.notebookData.length - 1].id + 1
    );
  };

  const handleLogOut = () => {
    logout();
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    setNotebookList(props.notebookData);
  }, [props.notebookData]);

  return (
    <ThemeProvider theme={props.theme}>
      <Box
        sx={{
          height: "100vh",
          width: "auto",
          minWidth: "300px",
          padding: "0px 20px",
          overflow: "scroll",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <Button
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              // border: `1px solid ${props.theme.palette.primary.main}`,
              "&:hover": {
                // backgroundColor: "rgba(112, 132, 255, 0.15)",
                backgroundColor: "rgb(214, 159, 149, 0.1)",
              },
            }}
          >
            <Avatar
              color="primary"
              alt="Your Name"
              src=""
              // variant="square"
              size="sm"
              sx={{
                fontWeight: "900",
                backgroundColor: `${props.theme.palette.primary.main}`,
                color: `${props.theme.palette.secondary.main}`,
              }}
            />

            <Typography
              sx={{
                fontFamily: "inter",
                fontWeight: 900,
                color: `${props.theme.palette.primary.main}`,
                textTransform: "capitalize",
                fontSize: "22px",
                marginTop: "2px",
              }}
            >
              {username ? username : "User"}
            </Typography>
          </Button>
          <IconButton
            color="primary"
            onClick={handleDrawerClose}
            sx={{ marginRight: "-15px" }}
          >
            {props.theme?.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>

        <ButtonGroup
          size="small"
          variant="contained"
          sx={{
            width: "100%",
            boxShadow: "none",
            display: props.isSmallScreen ? "none" : "flex",
          }}
        >
          <Button
            color="primary"
            sx={{
              width: "50%",
              color: `${props.theme.palette.secondary.main}`,
              fontWeight: "700",
            }}
            onClick={() => {
              props.setMode(false);
              if (props.isSmallScreen) {
                props.setMode(false);
                props.setOpen(false);
              }
            }}
          >
            Notebook
          </Button>
          <Button
            color="primary"
            sx={{
              width: "50%",
              color: `${props.theme.palette.secondary.main}`,
              fontWeight: "700",
            }}
            onClick={() => {
              props.setMode(true);
              if (props.isSmallScreen) {
                props.setMode(true);
                props.setOpen(false);
              }
            }}
          >
            Gantt
          </Button>
        </ButtonGroup>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px 0px 25px",
          }}
        >
          <Typography
            fontSize={"md"}
            sx={{
              fontWeight: 700,
              // color: "#7084FF",
              color: `${props.theme.palette.primary.main}`,
              p: "0px 6px 0px 8px",
            }}
          >
            Notebooks
          </Typography>
          <IconButton aria-label="delete" onClick={handleAddNotebook}>
            <ControlPointIcon
              fontSize="small"
              sx={{ color: `${props.theme.palette.primary.main}` }}
            />
          </IconButton>
        </Box>

        <Box sx={{ marginBottom: "50px" }}>
          {notebookList
            ? notebookList?.map((notebook, index) => {
                return (
                  <Notebook
                    theme={props.theme}
                    notebookData={notebookList}
                    notebook={notebook}
                    key={`${notebook.id}-${index}`}
                    setNotebookDisplay={props.setNotebookDisplay}
                    isSmallScreen={props.isSmallScreen}
                    setMode={props.setMode}
                    setOpen={props.setOpen}
                  />
                );
              })
            : null}
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            color: `${props.theme.palette.secondary.main}`,
            fontWeight: "700",
            marginBottom: "20px",
            boxShadow: "none",
          }}
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </Box>
    </ThemeProvider>
  );
}
