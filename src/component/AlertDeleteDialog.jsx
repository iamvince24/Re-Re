import * as React from "react";
import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, colors } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

import { getDatabase, set, remove, update, ref } from "firebase/database";
import database from "../firebase";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#2E4AF3",
//       // light: will be calculated from palette.primary.main,
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       main: "#E0C2FF",
//       light: "#F5EBFF",
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: "#47008F",
//     },
//     background: {
//       main: "#F3D9D2",
//     },
//   },
// });

export default function AlertDeleteDialog(props) {
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

  const uid = window.localStorage.getItem("uid");
  let notebookIdForFunc = 0;
  let chapterIdForFunc = 0;

  for (var i = 0; i < props.notebookData.length; i++) {
    if (props.notebookData[i]?.id === props.id) {
      notebookIdForFunc = i;
      if (props.chapterId !== undefined) {
        for (var j = 0; j < props.notebookData[i].Chapters.length; j++) {
          if (
            props.notebookData[notebookIdForFunc].Chapters[j]?.id ===
            props.chapterId
          ) {
            chapterIdForFunc = j;
            break;
          }
        }
      } else {
        break;
      }
    }
  }

  const handleDelete = () => {
    const db = getDatabase();
    const postData = null;

    // 要刪除數據的路徑
    let dataPath = "";
    if (props.chapterId !== undefined) {
      dataPath = `/users/${uid}/notebooks/${notebookIdForFunc}/Chapters/${chapterIdForFunc}`;
    } else {
      dataPath = `/users/${uid}/notebooks/${notebookIdForFunc}`;
    }
    const updates = {};
    updates[dataPath] = postData;
    return update(ref(db), updates);
  };

  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        <MenuItem variant="outlined" onClick={handleClickOpen}>
          Delete
        </MenuItem>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Delete ${props.deleteMessage}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              After deleting the notebook, it will never be restored. Please
              confirm to delete the notebook.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="secondary" onClick={handleDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Fragment>
  );
}
