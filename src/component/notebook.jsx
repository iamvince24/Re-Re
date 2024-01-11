import { Fragment, useState, useEffect } from "react";
import * as React from "react";
import { Box, Container } from "@mui/system";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E4AF3",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
    background: {
      main: "#F3D9D2",
    },
  },
});

export default function Notebook(props) {
  const [open, setOpen] = React.useState(true);

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
            // bgcolor: "#F3D9D2",
            // color: "#2E4AF3",
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
                backgroundColor: "rgb(214, 159, 149, 0.15)",
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
              theme={props.theme}
              addChapter={true}
              id={props.notebook.id}
              notebook={props.notebook}
              notebookData={props.notebookData}
              deleteMessage={props.notebook.name}
            />
          </ListItemButton>
          {props.notebook?.Chapters
            ? props.notebook?.Chapters.map((chapters, index) => {
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
                            backgroundColor: "rgb(214, 159, 149, 0.15)",
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
                          onClick={() => {
                            props.setNotebookDisplay({
                              notebookId: props.notebook.id,
                              chapterId: chapters.id,
                            });
                            if (props.isSmallScreen) {
                              props.setMode(false);
                              props.setOpen(false);
                            }
                          }}
                        />
                        <LongMenu
                          theme={props.theme}
                          id={props.notebook.id}
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
