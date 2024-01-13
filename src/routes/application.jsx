import { Fragment, useState, useEffect } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Menu from "../component/Menu";
import NotebookMode from "../component/NotebookMode";
import GanntMode from "../component/GanntMode";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import { useMediaQuery } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";
import { ThemeProvider } from "@mui/material/styles";

export default function Application(props) {
  const isSmallScreen = useMediaQuery("(max-width:767px)");
  const [mode, setMode] = useState(isSmallScreen ? false : true);
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

  let drawerWidth = isSmallScreen ? "100vw" : 350;

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

  const uid = window.localStorage.getItem("uid");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const starCountRef = await ref(db, `users/${uid}/notebooks`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          setNotebookData(data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <style>
        {`
        .css-12i7wg6-MuiPaper-root-MuiDrawer-paper {
          border: none;
        }

         .css-nhf7i1 {
          background: 'black';
        }
      `}
      </style>
      <ThemeProvider theme={props.theme}>
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "black",
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
              theme={props.theme}
              sx={{ border: "none" }}
              setMode={setMode}
              setOpen={setOpen}
              notebookData={notebookData}
              setNotebookDisplay={setNotebookDisplay}
              uid={uid}
              isSmallScreen={isSmallScreen}
            />
          </Drawer>

          <AppBar
            position="fixed"
            open={open}
            sx={{
              bgcolor: "#F3D9D2",
              borderLeft: open
                ? `3px solid ${props.theme.palette.dividerBorder.main}`
                : "none",
            }}
          >
            {mode ? (
              <GanntMode
                theme={props.theme}
                setOpen={setOpen}
                open={open}
                notebookData={notebookData}
                notebookDisplay={notebookDisplay}
                mode={mode}
                isSmallScreen={isSmallScreen}
              />
            ) : (
              <NotebookMode
                theme={props.theme}
                setOpen={setOpen}
                open={open}
                notebookData={notebookData}
                notebookDisplay={notebookDisplay}
                mode={mode}
                isSmallScreen={isSmallScreen}
              />
            )}
          </AppBar>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
