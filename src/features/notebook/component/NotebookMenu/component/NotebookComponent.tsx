import { Fragment } from "react";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LongMenu from "./LongMenu";
import { handleModeUpdate } from "../../../../../store/action";
import { handleSidebarOpen } from "../../../../../store/action";
import { handleUpdateIndex } from "../../../../../store/action";
import { useSelector } from "react-redux";
import type { Notebook, Chapter } from "../../../../../types";

interface NotebookComponentProps {
  dispatch: any;
  notebookIndex: number;
  notebook: Notebook;
  theme: any;
  notebookData?: any;
}

interface RootState {
  viewListener: {
    screenWidth767: boolean;
  };
}

export default function NotebookComponent(props: NotebookComponentProps) {
  const { dispatch, notebookIndex, notebook } = props;
  // console.log(notebookIndex);
  const [open, setOpen] = React.useState(true);

  const screenSmall767 = useSelector(
    (state: RootState) => state.viewListener.screenWidth767
  );

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        <List
          sx={{
            width: "100%",
            color: `${props.theme.palette.primary.main}`,
            py: "3px",
            overflow: "auto",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            onClick={handleClick}
            sx={{
              display: "flex",
              alignContent: "center",
              padding: "0px 0px 0px 8px",
              "&:hover": {
                backgroundColor: "rgba(155, 155, 155, 0.2)",
              },
            }}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
            <ImportContactsIcon
              sx={{ color: `${props.theme.palette.primary.main}`, mx: "10px" }}
            >
              <InboxIcon />
            </ImportContactsIcon>
            <ListItemText
              primary={props.notebook.name}
              primaryTypographyProps={{
                fontWeight: 700,
                pt: "2px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            />
            <LongMenu
              notebookIndex={notebookIndex}
              theme={props.theme}
              addChapter={true}
              id={props.notebook.id}
              notebookId={String(props.notebook.id)}
              notebook={props.notebook}
              notebookData={props.notebookData}
              deleteMessage={props.notebook.name}
            />
          </ListItemButton>
          {props.notebook.chapters && props.notebook.chapters.length > 0
            ? props.notebook.chapters.map((chapters: Chapter, index: number) => {
                return (
                  <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                    key={`${chapters.id}-${index}`}
                  >
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{
                          py: 0.25,
                          pr: 0,
                          ml: 6,
                          "&:hover": {
                            backgroundColor: "rgba(155, 155, 155, 0.2)",
                          },
                        }}
                      >
                        <ArticleOutlinedIcon
                          sx={{
                            color: `${props.theme.palette.primary.main}`,
                            marginRight: "10px",
                          }}
                        >
                          <StarBorder />
                        </ArticleOutlinedIcon>
                        <ListItemText
                          primary={chapters.name}
                          primaryTypographyProps={{
                            pt: "1px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          onClick={() => {
                            dispatch(handleUpdateIndex(notebookIndex, index));
                            dispatch(handleModeUpdate(false));
                            if (screenSmall767) {
                              dispatch(handleModeUpdate(true));
                              dispatch(handleSidebarOpen(false));
                            }
                          }}
                        />
                        <LongMenu
                          notebookIndex={notebookIndex}
                          chapterIndex={index}
                          theme={props.theme}
                          id={props.notebook.id}
                          notebookId={String(props.notebook.id)}
                          chapterId={String(chapters.id)}
                          notebook={props.notebook}
                          notebookData={props.notebookData}
                          deleteMessage={chapters.name}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                );
              })
            : null}
        </List>
      </ThemeProvider>
    </Fragment>
  );
}
