import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import AlertDialog from "../component/AlertDialog";

const options = ["Delete"];

const ITEM_HEIGHT = 48;

export default function LongMenu({ onClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "#2E4AF3" }}
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
        {options.map((option) => (
          // <MenuItem
          //   key={option}
          //   selected={option === "Pyxis"}
          //   onClick={handleClose}
          // >
          //   {option}
          // </MenuItem>
          <AlertDialog key={option} />
        ))}
      </Menu>
    </div>
  );
}
