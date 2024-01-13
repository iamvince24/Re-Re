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

export default function NotebookListGantt(props) {
  const { ganttUnfoldList, setGanttUnfoldList, theme } = props;
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
          // bgcolor: "#F3D9D2",
          color: `${theme.palette.primary.main}`,
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
            color: `${theme.palette.primary.main}`,
            px: 1,
            "&:hover": {
              backgroundColor: "rgb(214, 159, 149, 0.15)",
            },
          }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
          <ImportContactsIcon
            sx={{ color: `${theme.palette.primary.main}`, mx: "10px" }}
          >
            <InboxIcon />
          </ImportContactsIcon>
          <ListItemText
            primary={props.notebook?.name}
            primaryTypographyProps={{
              fontWeight: 700,
              whiteSpace: "nowrap",
              color: `${theme.palette.primary.main}`,
            }}
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
                        pl: 5,
                        py: 0,
                        height: "40px",
                        color: `${theme.palette.primary.main}`,
                        "&:hover": {
                          backgroundColor: "rgb(214, 159, 149, 0.15)",
                        },
                      }}
                    >
                      <ArticleOutlinedIcon
                        sx={{
                          color: `${theme.palette.primary.main}`,
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
