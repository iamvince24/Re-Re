import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MenuItem from "@mui/material/MenuItem";

import styled from "styled-components";

import {
  getDatabase,
  set,
  remove,
  update,
  ref,
  push,
  child,
} from "firebase/database";

const TextInput = styled("input")(() => ({
  height: "30px",
  marginTop: "10px",
  paddingLeft: "5px",
  borderTop: "none",
  borderRight: "none",
  borderLeft: "none",
  color: "var(--primary-color)",
  width: "100%",
  letterSpacing: "1px",
  "&:focus": {
    outline: "none",
  },
}));

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");

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

  // console.log(props.chapterId);
  // console.log(props.id);
  // console.log(props.notebook.Chapters[props.chapterId - 1]);

  const handleRename = (name) => {
    const db = getDatabase();

    // A post entry.
    let postData = {};
    if (props.chapterId !== undefined) {
      postData = {
        ...props.notebook.Chapters[props.chapterId - 1],
        name: name,
      };
    } else {
      postData = {
        ...props.notebook,
        name: name,
      };
    }

    let dataPath = "";
    if (props.chapterId !== undefined) {
      dataPath = `/notebooks/${props.id - 1}/Chapters/${props.chapterId - 1}`;
    } else {
      dataPath = `/notebooks/${props.id - 1}`;
    }
    const updates = {};
    updates[dataPath] = postData;

    return update(ref(db), updates);
  };

  return (
    <React.Fragment>
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
          />
        </DialogContent>
        <DialogActions onClick={handleClose}>
          <Button>Cancel</Button>
          {props.num ? (
            <Button
              onClick={() => {
                handleConfirm();
              }}
            >
              Confirm
            </Button>
          ) : null}
          {props.id ? (
            <Button
              onClick={() => {
                handleRename(newName);
              }}
            >
              Confirm
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
