import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ThemeProvider } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { handleModeUpdate } from "../redux/action";
import { handleSidebarOpen } from "../redux/action";
import { v4 as uuidv4 } from "uuid";
import { getDatabase, ref, update } from "firebase/database";
import Notebook from "./notebook";
import { logout } from "../firebase";
import { useSelector } from "react-redux";
import PositionedMenu from "./PositionedMenu";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

function writeNewPost(uid, index) {
  const db = getDatabase();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const defaultStartDate = new Date(year, month - 1, day);
  const defaultEndDate = new Date(year, month - 1, day);
  defaultEndDate.setDate(defaultEndDate.getDate() + 1);
  const formattedStartDate = formatDate(defaultStartDate);
  const formattedEndDate = formatDate(defaultEndDate);

  const id = generateNumericId();
  const postData = {
    id: id,
    name: "Default Notebook",
    start: formattedStartDate,
    end: formattedEndDate,
    color: "white",
    chapters: [
      {
        id: id,
        name: "Default Chapter",
        start: formattedStartDate,
        end: formattedEndDate,
        content: "Type something",
        color: "white",
      },
    ],
  };

  const newPostKey = index;
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

function generateNumericId() {
  const fullId = uuidv4();
  const numericId = fullId.replace(/\D/g, "").substring(0, 5);
  return parseInt(numericId, 10);
}

export default function Menu(props) {
  const { dispatch, theme, uid } = props;
  const navigate = useNavigate();
  const allNotebookData = useSelector((state) => state.notebookData.notebooks);
  const username = useSelector((state) => state.notebookData.username);
  console.log(username);

  const screenSmall767 = useSelector(
    (state) => state.viewListener.screenWidth767
  );

  const handleDrawerClose = () => {
    dispatch(handleSidebarOpen(false));
  };

  const handleAddNotebook = () => {
    const notebookIndex =
      allNotebookData[0].name === "Please Add Notebook"
        ? 0
        : allNotebookData.length;

    writeNewPost(uid, notebookIndex);
  };

  const handleLogOut = () => {
    logout();
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
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
          <PositionedMenu theme={theme} username={username} />
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
        <Box
          size="small"
          variant="contained"
          sx={{
            width: "100%",
            boxShadow: "none",
            display: screenSmall767 ? "none" : "flex",
            backgroundColor: "rgb(155, 155, 155, 0.5)",
            borderRadius: "5px",
            padding: "5px",
            height: "37.5px",
            marginBottom: "25px",
          }}
        >
          <Button
            color="primary"
            sx={{
              width: "50%",
              color: `${theme.palette.secondary.main}`,
              fontWeight: "600",
              textTransform: "capitalize",
              "&:hover": {
                bgcolor: "rgba(244, 244, 243, 0.15)",
              },
            }}
            onClick={() => {
              dispatch(handleModeUpdate(false));
              if (screenSmall767) {
                dispatch(handleModeUpdate(false));
                dispatch(handleSidebarOpen(false));
              }
            }}
          >
            Notebook
          </Button>
          <Button
            color="modeTabButton"
            sx={{
              width: "50%",
              color: `${theme.palette.secondary.main}`,
              fontWeight: "600",
              textTransform: "capitalize",
              "&:hover": {
                bgcolor: "rgba(244, 244, 243, 0.15)",
              },
            }}
            onClick={() => {
              dispatch(handleModeUpdate(true));
              if (screenSmall767) {
                dispatch(handleModeUpdate(true));
                dispatch(handleSidebarOpen(false));
              }
            }}
          >
            Gantt
          </Button>
        </Box>
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
              color: `${theme.palette.primary.main}`,
              p: "0px 6px 0px 8px",
            }}
          >
            Notebooks
          </Typography>
          <IconButton aria-label="delete" onClick={handleAddNotebook}>
            <ControlPointIcon
              fontSize="small"
              sx={{ color: `${theme.palette.primary.main}` }}
            />
          </IconButton>
        </Box>

        <Box sx={{ marginBottom: "50px" }}>
          {allNotebookData
            ? allNotebookData?.map((notebook, index) => {
                return (
                  <Notebook
                    theme={theme}
                    dispatch={dispatch}
                    notebookData={allNotebookData}
                    notebook={notebook}
                    key={`${notebook.id}-${index}`}
                    // setNotebookDisplay={setNotebookDisplay}
                    // isSmallScreen={screenSmall767}
                    notebookIndex={index}
                  />
                );
              })
            : null}
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            color: `${theme.palette.secondary.main}`,
            fontWeight: "700",
            marginBottom: "20px",
            boxShadow: "none",
            display: "none",
          }}
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </Box>
    </ThemeProvider>
  );
}
