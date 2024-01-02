import { Fragment, useState, useEffect } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";
import Menu from "../component/Menu";
import NotebookMode from "../component/NotebookMode";
import GanntMode from "../component/GanntMode";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import { client } from "../utils/fetchWrapper";

import { useMediaQuery } from "@mui/material";

import database from "../firebase.js"; // 確保路徑正確
import { getDatabase, ref, get, onValue } from "firebase/database";

let drawerWidth = 350;

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
  const isSmallScreen = useMediaQuery("(max-width:767px)");
  const [mode, setMode] = useState(true);
  const [open, setOpen] = useState(isSmallScreen ? false : true);
  const [notebookData, setNotebookData] = useState([
    {
      id: 1,
      name: "Loading",
      start: "YYYY-MM-DD",
      end: "YYYY-MM-DD",
      Chapters: [
        {
          id: "1",
          name: "Loading",
          start: "YYYY-MM-DD",
          end: "YYYY-MM-DD",
          content: "",
        },
      ],
    },
  ]);

  const [notebookDisplay, setNotebookDisplay] = useState({
    notebookId: 1,
    chapterId: 1,
  });
  drawerWidth = isSmallScreen ? window.innerWidth : 350;

  // useEffect(() => {
  //   client("notebookData.json").then(
  //     (data) => {
  //       setNotebookData(data?.notebooks);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   const db = getDatabase();
  //   const starCountRef = ref(db, "notebooks");
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setNotebookData(data);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const starCountRef = ref(db, "notebooks");
        const snapshot = await get(starCountRef);
        const data = snapshot.val();
        setNotebookData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const notebookListRef = ref(database, "notebooks");
  //   get(notebookListRef).then(
  //     (snapshot) => {
  //       // 使用 get 方法
  //       const data = snapshot.val();
  //       setNotebookData(data);
  //     },
  //     (error) => {
  //       console.error("Error: ", error);
  //     }
  //   );
  // }, []);

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
            // width: isSmallScreen ? "100vw" : drawerWidth,
            flexShrink: 0,
            border: "none",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              // width: isSmallScreen ? "100vw" : drawerWidth,
              boxSizing: "border-box",
            },
          }}
          // variant="persistent"
          variant={isSmallScreen ? "temporary" : "persistent"}
          anchor="left"
          open={open}
        >
          <Menu
            sx={{ border: "none" }}
            setMode={setMode}
            setOpen={setOpen}
            notebookData={notebookData}
            setNotebookDisplay={setNotebookDisplay}
          />
        </Drawer>

        <AppBar
          position="fixed"
          open={open}
          sx={{ bgcolor: "#F3D9D2", borderLeft: "3px solid #F0D2CA" }}
        >
          {mode ? (
            <GanntMode
              setOpen={setOpen}
              open={open}
              notebookData={notebookData}
              notebookDisplay={notebookDisplay}
              mode={mode}
            />
          ) : (
            <NotebookMode
              setOpen={setOpen}
              open={open}
              notebookData={notebookData}
              notebookDisplay={notebookDisplay}
              mode={mode}
            />
          )}
        </AppBar>
      </Box>
    </Fragment>
  );
}
