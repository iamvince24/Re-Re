import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { Fragment } from "react";

import AlertDeleteDialog from "./AlertDeleteDialog";
import AlertRenameDialog from "./AlertRenameDialog";
import FormDialog from "./FormDialog";
import { Button } from "@mui/material";

import { getDatabase, ref, set, child, push, update } from "firebase/database";
import { ThemeProvider } from "@mui/material/styles";

const options = ["Rename", "Delete"];

const ITEM_HEIGHT = 48;

function AddNewChapter(uid, notebookId, chapterId) {
  const db = getDatabase();

  const { formattedStartDate, formattedEndDate } = getFormattedDates();

  // A post entry.
  const postData = {
    id: chapterId,
    name: "Default Chapter",
    start: formattedStartDate,
    end: formattedEndDate,
    content: "Type something",
  };

  // Get a key for a new Post.

  const newPostKey = chapterId - 1;
  const updates = {};
  updates[
    "/users/" + uid + "/notebooks/" + notebookId + "/Chapters/" + newPostKey
  ] = postData;

  return update(ref(db), updates);
}

function getFormattedDates() {
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

  return { formattedStartDate, formattedEndDate };
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleAddNewChapter = () => {
    let notebookId = 0;
    const uid = window.localStorage.getItem("uid");
    for (var i = 0; i < props.notebookData.length; i++) {
      if (props.notebookData[i]?.id === props.notebook.id) {
        notebookId = i;
        break;
      }
    }
    const chapterId =
      props.notebookData[notebookId].Chapters[
        props.notebookData[notebookId].Chapters.length - 1
      ].id + 1;
    AddNewChapter(uid, notebookId, chapterId);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: `${props.theme.palette.primary.main}` }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "15ch",
          },
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {props.addChapter ? (
          <MenuItem onClick={handleAddNewChapter}>Add Chapter</MenuItem>
        ) : null}
        <FormDialog
          handleClose={handleClose}
          handleCloseBtn={handleClose}
          id={props.id}
          chapterId={props.chapterId}
          notebook={props.notebook}
          notebookData={props.notebookData}
        />
        <AlertDeleteDialog
          handleCloseBtn={handleClose}
          id={props.id}
          chapterId={props.chapterId}
          notebookData={props.notebookData}
          deleteMessage={props.deleteMessage}
        />
      </Menu>
    </Fragment>
  );
}
