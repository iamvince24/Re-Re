import { Fragment, useState } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";
import Menu from "../component/Menu";
import NotebookMode from "../component/NotebookMode";
import GanntMode from "../component/GanntMode";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 350;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Application() {
  const [mode, setMode] = useState(true);
  const [open, setOpen] = React.useState(true);

  return (
    <Fragment>
      <style>
        {`
        .css-12i7wg6-MuiPaper-root-MuiDrawer-paper {
          border: none;
        }
      `}
      </style>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#F3D9D2",
        }}
      >
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            border: "none",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Menu setMode={setMode} setOpen={setOpen} sx={{ border: "none" }} />
        </Drawer>

        <AppBar
          position="fixed"
          open={open}
          sx={{ bgcolor: "#F3D9D2", borderLeft: "3px solid #F0D2CA" }}
        >
          {mode ? (
            <GanntMode setOpen={setOpen} open={open} />
          ) : (
            <NotebookMode setOpen={setOpen} open={open} />
          )}
        </AppBar>
      </Box>
    </Fragment>
  );
}
