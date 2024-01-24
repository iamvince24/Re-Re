import * as React from "react";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { ThemeProvider } from "@mui/material/styles";

import { getDatabase, update, ref } from "firebase/database";

const TextInput = styled("input")(() => ({
  height: "30px",
  marginTop: "10px",
  paddingLeft: "5px",
  borderTop: "none",
  borderRight: "none",
  borderLeft: "none",
  color: "var(--secondary-color)",
  width: "100%",
  letterSpacing: "1px",
  "&:focus": {
    outline: "none",
  },
}));

export default function FormDialog(props) {
  const { notebookIndex, chapterIndex } = props;

  let defaultName = "";
  if (chapterIndex !== undefined) {
    defaultName = props.notebookData[notebookIndex].chapters[chapterIndex].name;
  } else {
    defaultName = props.notebookData[notebookIndex].name;
  }

  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState(defaultName);

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleClickOpen = (event) => {
    setOpen(true);
    event.stopPropagation();
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
    props.handleCloseBtn(event);
  };

  const handleConfirm = (e) => {
    setOpen(false);
    props.handleClose();
    props.onChange(newName, props.num);
    setNewName("");
  };

  const handleRename = (name) => {
    const db = getDatabase();
    const uid = window.localStorage.getItem("uid");

    let postData = {};
    if (chapterIndex !== undefined) {
      postData = {
        ...props.notebookData[notebookIndex].chapters[chapterIndex],
        name: name,
      };
    } else {
      postData = {
        ...props.notebookData[notebookIndex],
        name: name,
      };
    }

    let dataPath = "";
    if (chapterIndex !== undefined) {
      dataPath = `/users/${uid}/notebooks/${notebookIndex}/chapters/${chapterIndex}`;
    } else {
      dataPath = `/users/${uid}/notebooks/${notebookIndex}`;
    }

    const updates = {};
    updates[dataPath] = postData;

    return update(ref(db), updates);
  };

  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        <MenuItem variant="outlined" onClick={handleClickOpen}>
          Rename
        </MenuItem>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Rename</DialogTitle>
          <DialogContent sx={{ width: "500px" }}>
            <DialogContentText>
              Please fill in the name you want to rename.
            </DialogContentText>

            <TextInput
              placeholder="New Notebook Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onClick={handleClick}
              defaultValue={"dsfsd"}
              autoFocus
            />
          </DialogContent>
          <DialogActions onClick={handleClose}>
            <Button color="secondary">Cancel</Button>
            {props.num ? (
              <Button
                color="secondary"
                onClick={() => {
                  handleConfirm();
                }}
              >
                Confirm
              </Button>
            ) : null}
            {props?.id ? (
              <Button
                color="secondary"
                onClick={() => {
                  handleRename(newName);
                }}
              >
                Confirm
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Fragment>
  );
}
