import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { getDatabase, ref, update } from "firebase/database";

export default function ChangeUserNameFormDialog(props) {
  const { handleMenuClose, theme } = props;
  const username = useSelector((state) => state.notebookData.username);

  const [textFieldValue, setTextFieldValue] = useState(username);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleMenuClose();
    setOpen(false);
  };

  const uid = window.localStorage.getItem("uid");

  const updatedUserName = (uid, name) => {
    const db = getDatabase();
    const postData = `${name}`;
    const updates = {};
    updates["/users/" + uid + "/username/"] = postData;

    handleClose();
    update(ref(db), updates);
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <MenuItem variant="outlined" onClick={handleClickOpen}>
          Change User Name
        </MenuItem>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Change User Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the new username you want to name.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              type="email"
              fullWidth
              variant="standard"
              value={textFieldValue}
              onChange={(e) => setTextFieldValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="secondary"
              onClick={() => updatedUserName(uid, textFieldValue)}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Fragment>
  );
}
