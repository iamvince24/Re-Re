import { Fragment, useState, useEffect } from "react";
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
import LongMenu from "../component/LongMenu";
import { handleModeUpdate } from "../redux/action";
import { handleSidebarOpen } from "../redux/action";
import { handleUpdateIndex } from "../redux/action";
import { useSelector } from "react-redux";

export default function Notebook(props) {
  const { dispatch, notebookIndex, notebook } = props;
  // console.log(notebookIndex);
  const [open, setOpen] = React.useState(true);

  const screenSmall767 = useSelector(
    (state) => state.viewListener.screenWidth767
  );

  const handleClick = (event) => {
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
              primary={props.notebook?.name}
              primaryTypographyProps={{
                fontWeight: 700,
                pt: "2px",
                overflow: "hidden",
              }}
            />
            <LongMenu
              notebookIndex={notebookIndex}
              theme={props.theme}
              addChapter={true}
              id={props.notebook.id}
              notebookId={notebook.id}
              notebook={props.notebook}
              notebookData={props.notebookData}
              deleteMessage={props.notebook.name}
            />
          </ListItemButton>
          {props.notebook?.chapters
            ? props.notebook?.chapters.map((chapters, index) => {
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
                          primaryTypographyProps={{ pt: "1px" }}
                          // chapterIndex={index}
                          onClick={() => {
                            // props.setNotebookDisplay({
                            //   notebookId: props.notebook.id,
                            //   chapterId: chapters.id,
                            // });
                            dispatch(handleUpdateIndex(notebookIndex, index));
                            if (screenSmall767) {
                              dispatch(handleModeUpdate(true));
                              // props.setOpen(false);
                              dispatch(handleSidebarOpen(false));
                            }
                          }}
                        />
                        <LongMenu
                          notebookIndex={notebookIndex}
                          chapterIndex={index}
                          theme={props.theme}
                          id={props.notebook.id}
                          notebookId={notebook.id}
                          chapterId={chapters.id}
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
