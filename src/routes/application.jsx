import { Fragment, useState, useEffect } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Menu from "../component/Menu";
import NotebookMode from "../component/NotebookMode";
import GanntMode from "../component/GanntMode";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { fetchNotebookData } from "../redux/action";
import { handleModeUpdate } from "../redux/action";
import { handleUpdateIndex } from "../redux/action";
import { handleUpdatedGanttUnfoldList } from "../redux/action";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerwidth}px)`,
    marginLeft: `${drawerwidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ApplicationContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  background-color: black;
`;

export default function Application(props) {
  const { theme, dispatch } = props;
  const allNotebookData = useSelector((state) => state.notebookData.notebooks);

  const screenSmall767 = useSelector(
    (state) => state.viewListener.screenWidth767
  );
  const isNotebookMode = useSelector(
    (state) => state.viewListener.viewModeisNotebook
  );
  const isSidebarOpen = useSelector((state) => state.viewListener.sidebarOpen);

  const drawerwidth = screenSmall767 ? "100vw" : 350;

  function getInitNotebookAndChapterId(allData) {
    let notebookIdList = [];
    let chapterIdList = [];
    allData?.forEach((notebook, index) => {
      notebookIdList.push(index);
      notebook.chapters?.forEach((chapter, index) => {
        chapterIdList.push(index);
      });
    });
    dispatch(handleUpdateIndex(notebookIdList[0], chapterIdList[0]));
  }

  function handleSetGanttUnfoldList(allData) {
    let indexList = [];
    let ganttUnfoldList = {};
    allData?.forEach((notebook, index) => {
      indexList.push(index);
    });
    indexList?.forEach((element, index) => {
      ganttUnfoldList = {
        ...ganttUnfoldList,
        [`${element}`]: "false",
      };
    });
    dispatch(handleUpdatedGanttUnfoldList(ganttUnfoldList));
  }

  const uid = window.localStorage.getItem("uid");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const starCountRef = await ref(db, `users/${uid}/notebooks`);
        onValue(starCountRef, async (snapshot) => {
          const snapshotValue = snapshot.val();
          if (snapshotValue !== null && typeof snapshotValue === "object") {
            const data = Object.values(snapshotValue);
            await dispatch(fetchNotebookData(data));
            await handleSetGanttUnfoldList(data);
          } else {
            console.error("沒有資料了");
            dispatch(
              fetchNotebookData([
                {
                  id: 12312,
                  name: "Please Add Notebook",
                  start: "2024-01-01",
                  end: "2024-01-02",
                  chapters: [],
                },
              ])
            );
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (screenSmall767) {
      dispatch(handleModeUpdate(false));
    }
  });

  return (
    <Fragment>
      <style>
        {`
        // .css-12i7wg6-MuiPaper-root-MuiDrawer-paper {
        //   border: none;
        // }

        //  .css-nhf7i1 {
        //   background: 'black';
        // }
      `}
      </style>
      <ThemeProvider theme={theme}>
        <ApplicationContainer component="section">
          <Drawer
            sx={{
              width: drawerwidth,
              flexShrink: 0,
              border: "none",
              "& .MuiDrawer-paper": {
                width: drawerwidth,
                boxSizing: "border-box",
              },
            }}
            variant={screenSmall767 ? "temporary" : "persistent"}
            anchor="left"
            open={isSidebarOpen}
          >
            <Menu
              dispatch={dispatch}
              theme={theme}
              sx={{ border: "none" }}
              notebookData={allNotebookData}
              uid={uid}
            />
          </Drawer>

          <AppBar
            drawerwidth={drawerwidth}
            position="fixed"
            open={isSidebarOpen}
            style={{
              bgcolor: "#F3D9D2",
              borderLeft: isSidebarOpen
                ? `3px solid ${theme.palette.dividerBorder.main}`
                : "none",
            }}
          >
            {isNotebookMode ? (
              <GanntMode
                dispatch={dispatch}
                theme={theme}
                notebookData={allNotebookData}
              />
            ) : (
              <NotebookMode dispatch={dispatch} theme={theme} />
            )}
          </AppBar>
        </ApplicationContainer>
      </ThemeProvider>
    </Fragment>
  );
}
