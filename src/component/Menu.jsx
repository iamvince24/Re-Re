import { Fragment, useState, useEffect } from "react";
import * as React from "react";
import { Box, Container } from "@mui/system";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { getDatabase, ref, set, child, push, update } from "firebase/database";

import Notebook from "./notebook";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E4AF3",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
    background: {
      main: "#F3D9D2",
    },
  },
});

function writeNewPost(id) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    id: id,
    name: "Default Notebook",
    start: "2022-01-01",
    end: "2022-01-10",
    Chapters: [
      {
        id: `${id + "-1"}`,
        name: "Default Chapter",
        start: "2022-01-01",
        end: "2022-01-10",
        content: "Lorem ipsum",
      },
    ],
  };

  // Get a key for a new Post.
  const newPostKey = id;
  const updates = {};
  updates["/notebooks/" + newPostKey] = postData;

  return update(ref(db), updates);
}

export default function Menu(props) {
  const [notebookList, setNotebookList] = useState(props.notebookData);

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  const handleAddNotebook = () => {
    writeNewPost(props.notebookData.length);
  };

  useEffect(() => {
    setNotebookList(props.notebookData);
  }, [props.notebookData]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "20%",
        minWidth: "350px",
        padding: "0px 20px",
        overflow: "scroll",
        bgcolor: "#F3D9D2",
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
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            "&:hover": {
              backgroundColor: "rgba(112, 132, 255, 0.15)",
            },
          }}
        >
          <Avatar
            alt="Your Name"
            src=""
            variant="square"
            size="sm"
            sx={{
              fontWeight: "900",
              backgroundColor: "#2E4AF3",
              color: "white",
            }}
          />
          <Typography
            fontSize={"lg"}
            sx={{
              fontWeight: 700,
              color: "#2E4AF3",
              textTransform: "capitalize",
            }}
          >
            Vince Guo
          </Typography>
        </Button>
        <IconButton onClick={handleDrawerClose} sx={{ marginRight: "-15px" }}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>

      <ThemeProvider theme={theme}>
        <ButtonGroup
          size="small"
          variant="outlined"
          sx={{
            width: "100%",
          }}
        >
          <Button
            sx={{
              width: "100%",
              color: "#2E4AF3",
            }}
            onClick={() => props.setMode(false)}
          >
            Notebook
          </Button>
          <Button
            sx={{ width: "100%", color: "#2E4AF3" }}
            onClick={() => props.setMode(true)}
          >
            Gantt
          </Button>
        </ButtonGroup>
      </ThemeProvider>

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
            fontWeight: 500,
            color: "#7084FF",
            p: "0px 6px 0px 8px",
          }}
        >
          Notebooks
        </Typography>
        <IconButton aria-label="delete">
          <ControlPointIcon
            fontSize="small"
            sx={{ color: "#7084FF" }}
            onClick={handleAddNotebook}
          />
        </IconButton>
      </Box>

      <Box sx={{ marginBottom: "50px" }}>
        {notebookList
          ? notebookList?.map((notebook, index) => {
              return (
                <Notebook
                  notebook={notebook}
                  key={`${notebook.id}-${index}`}
                  setNotebookDisplay={props.setNotebookDisplay}
                />
              );
            })
          : null}
      </Box>
    </Box>
  );
}
