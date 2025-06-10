import { Fragment, useEffect } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { fetchNotebookData } from "../../store/action";
import { handleModeUpdate } from "../../store/action";
import { handleGanttUnfold } from "../../store/action";
import { updatedUsername } from "../../store/action";
import NotebookMenu from "../../features/notebook/component/NotebookMenu";
import GanttChartMode from "../../features/notebook/component/GanttChartMode";
import NotebookMode from "../../features/notebook/component/NotebookMode";

interface AppBarProps {
  open?: boolean;
  drawerwidth?: number | string;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerwidth",
})<AppBarProps>(({ theme, open, drawerwidth }) => ({
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

interface ApplicationProps {
  theme: any;
  dispatch: any;
}

interface RootState {
  notebookData: {
    notebooks: any[];
  };
  viewListener: {
    screenWidth767: boolean;
    isGanttMode: boolean;
    sidebarOpen: boolean;
  };
}

export default function Application(props: ApplicationProps) {
  const { theme, dispatch } = props;
  const allNotebookData = useSelector((state: RootState) => state.notebookData.notebooks);

  const screenSmall767 = useSelector(
    (state: RootState) => state.viewListener.screenWidth767
  );

  const isGanttMode = useSelector((state: RootState) => state.viewListener.isGanttMode);
  const isSidebarOpen = useSelector((state: RootState) => state.viewListener.sidebarOpen);

  const drawerwidth = screenSmall767 ? "100vw" : 350;

  function handleSetGanttUnfoldList(allData: any[]) {
    let indexList: number[] = [];
    let ganttUnfoldList: { [key: string]: string } = {};
    allData?.forEach((notebook: any, index: number) => {
      indexList.push(index);
    });
    indexList?.forEach((element: number, index: number) => {
      ganttUnfoldList = {
        ...ganttUnfoldList,
        [`${element}`]: "true",
      };
      dispatch(handleGanttUnfold(index, true));
    });
  }

  function updatedUserName(uid: string | null, name: string) {
    const db = getDatabase();
    const postData = `${name}`;
    const updates: { [key: string]: any } = {};
    updates["/users/" + uid + "/username/"] = postData;

    return update(ref(db), updates);
  }

  const uid = window.localStorage.getItem("uid");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const starCountRef = await ref(db, `users/${uid}`);
        onValue(starCountRef, async (snapshot) => {
          const snapshotValue = snapshot.val();

          if (snapshotValue.username) {
            window.localStorage.setItem("username", snapshotValue.username);
            dispatch(updatedUsername(snapshotValue.username));
          } else {
            window.localStorage.setItem("username", "User");
            dispatch(updatedUsername("User"));
            updatedUserName(uid, "User");
          }

          if (snapshotValue !== null && typeof snapshotValue === "object") {
            // const data = Object.values(snapshotValue.notebooks);
            const data = snapshotValue.notebooks;
            if (data !== undefined && data[0].name !== undefined) {
              await dispatch(fetchNotebookData(data));
              await handleSetGanttUnfoldList(data);
            } else {
              dispatch(
                fetchNotebookData([
                  {
                    id: 12312,
                    name: "Please Add Notebook",
                    start: "2024-01-01",
                    end: "2024-01-06",
                    color: "white",
                    chapters: [
                      {
                        id: "15433",
                        name: "Please Add Notebook",
                        start: "2024-01-01",
                        end: "2024-01-06",
                        content: "",
                        color: "white",
                      },
                    ],
                  },
                ])
              );
            }
          } else {
            console.error("沒有資料了");
            dispatch(
              fetchNotebookData([
                {
                  id: 12312,
                  name: "Please Add Notebook",
                  start: "2024-01-01",
                  end: "2024-01-02",
                  color: "white",
                  chapters: [
                    {
                      id: "15433",
                      name: "Please Add Notebook",
                      start: "2024-01-01",
                      end: "2024-01-02",
                      content: "",
                      color: "white",
                    },
                  ],
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
            <NotebookMenu
              dispatch={dispatch}
              theme={theme}
              uid={uid}
            />
          </Drawer>

          <AppBar
            className="bgTexture"
            drawerwidth={drawerwidth}
            position="fixed"
            open={isSidebarOpen}
            style={{
              backgroundColor: "#F3D9D2",
              borderLeft: isSidebarOpen
                ? `0.5px solid ${theme.palette.dividerBorder.main}`
                : "none",
            }}
          >
            {isGanttMode ? (
              <GanttChartMode
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
