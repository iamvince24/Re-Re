import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../../firebase";
import ChangeUserNameFormDialog from "./ChangeUserNameFormDialog";

interface PositionedMenuProps {
  theme: any;
  username: string;
}

export default function PositionedMenu(props: PositionedMenuProps) {
  const { theme, username } = props;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logout();
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("username");
    handleClose();
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          color="primary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "5px 15px",
            "&:hover": {
              backgroundColor: "rgba(155, 155, 155, 0.2)",
            },
          }}
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar
            color="primary"
            alt="Your Name"
            src=""
            sx={{
              fontWeight: "900",
              width: "30px",
              height: "30px",
              backgroundColor: `${theme.palette.primary.main}`,
              color: `${theme.palette.secondary.main}`,
            }}
          />

          <Typography
            sx={{
              fontFamily: "inter",
              fontWeight: 800,
              color: `${theme.palette.primary.main}`,
              textTransform: "capitalize",
              // fontSize: "22px",
              fontSize: "18px",
              marginTop: "2px",
            }}
          >
            {username ? username : "User"}
          </Typography>
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <ChangeUserNameFormDialog
            theme={theme}
            handleMenuClose={handleClose}
          />
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    </ThemeProvider>
  );
}
