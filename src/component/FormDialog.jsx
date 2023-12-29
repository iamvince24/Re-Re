import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MenuItem from "@mui/material/MenuItem";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
    props.handleClose();
  };

  const handleConfirm = (e) => {
    setOpen(false);
    props.handleClose();
    props.onChange(newName, props.num);
    setNewName("");
  };

  return (
    <React.Fragment>
      <MenuItem variant="outlined" onClick={handleClickOpen}>
        Rename
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename</DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Notebook Name"
            type="email"
            fullWidth
            variant="standard"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            // onChange={(e) => props.onChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
