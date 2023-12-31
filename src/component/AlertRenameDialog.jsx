import * as React from "react";
import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, colors } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getDatabase, set, remove, update, ref } from "firebase/database";
import database from "../firebase";

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

export default function AlertRenameDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
    props.handleCloseBtn(event);
  };

  const handleRename = () => {
    const db = getDatabase();
    const postData = null;

    // 要刪除數據的路徑
    let dataPath = "";
    if (props.chapterId !== undefined) {
      dataPath = `/notebooks/${props.id - 1}/Chapters/${props.chapterId - 1}`;
    } else {
      dataPath = `/notebooks/${props.id - 1}`;
    }
    // const newPostKey = id;
    const updates = {};
    updates[dataPath] = postData;
    return update(ref(db), updates);
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{ mx: "10px", px: "10px", width: "85%", marginBottom: "5px" }}
        >
          Rename
        </Button>
      </ThemeProvider>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Notebook?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please fill in the name you want to rename.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRename} autoFocus>
            Check
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
