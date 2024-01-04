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
import LongMenu from "../LongMenu";
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

export default function NotebookListGantt(props) {
  const { ganttUnfoldList, setGanttUnfoldList } = props;
  const unfold = ganttUnfoldList.list.includes(props.notebook.id);
  const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(true);
  // console.log(open);

  const handleClick = (event) => {
    event.stopPropagation();
    // setOpen(!open);
    handleGanttUnfoldAction(open);
  };

  const handleGanttUnfoldAction = (open) => {
    if (open) {
      setGanttUnfoldList((prevList) => ({
        ...prevList,
        list: prevList.list.filter((value) => value !== props.notebook.id),
      }));
    } else {
      setGanttUnfoldList((prevList) => ({
        ...prevList,
        list: [...prevList.list, props.notebook.id],
      }));
    }
  };

  useEffect(() => {
    if (unfold) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [unfold]);

  return (
    <Fragment>
      <List
        sx={{
          width: "100%",
          bgcolor: "#F3D9D2",
          color: "#2E4AF3",
          // py: "3px",
          // py: 0.5,
          py: 0,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            height: "40px",
            display: "flex",
            alignContent: "center",
            // padding: "0px 0px 0px 8px",
          }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
          <ImportContactsIcon sx={{ color: "#2E4AF3", mx: "10px" }}>
            <InboxIcon />
          </ImportContactsIcon>
          <ListItemText
            primary={props.notebook?.name}
            primaryTypographyProps={{ fontWeight: 700 }}
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
                  sx={{ height: "40px", padding: 0 }}
                >
                  <List component="div" disablePadding sx={{ height: "40px" }}>
                    <ListItemButton
                      sx={{
                        // py: 0.25,
                        // py: 0,
                        p: 0,
                        ml: 6,
                        height: "40px",
                      }}
                    >
                      <ArticleOutlinedIcon
                        sx={{
                          color: "#2E4AF3",
                          marginRight: "10px",
                        }}
                      >
                        <StarBorder />
                      </ArticleOutlinedIcon>
                      <ListItemText
                        primary={chapters.name}
                        primaryTypographyProps={{ pt: "1px" }}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              );
            })
          : null}
      </List>
    </Fragment>
  );
}
