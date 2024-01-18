import { Fragment, useState, useEffect } from "react";
import * as React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { handleGanttUnfold } from "../../redux/action";

export default function NotebookListGantt(props) {
  const { theme, notebook, index } = props;
  const dispatch = useDispatch();

  const isUnfold = useSelector(
    (state) => state.viewListener.ganttUnfold[index]
  );

  const handleClick = (event) => {
    event.stopPropagation();
    dispatch(handleGanttUnfold(index, !isUnfold));
  };

  return (
    <Fragment>
      <List
        sx={{
          width: "100%",
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
              backgroundColor: "rgba(155, 155, 155, 0.2)",
            },
          }}
        >
          {isUnfold ? <ExpandLess /> : <ExpandMore />}
          <ImportContactsIcon
            sx={{ color: `${theme.palette.primary.main}`, mx: "10px" }}
          >
            <InboxIcon />
          </ImportContactsIcon>
          <ListItemText
            primary={notebook?.name}
            primaryTypographyProps={{
              fontWeight: 700,
              whiteSpace: "nowrap",
              color: `${theme.palette.primary.main}`,
            }}
          />
        </ListItemButton>
        {notebook?.chapters
          ? notebook?.chapters.map((chapter, index) => {
              return (
                <Collapse
                  in={isUnfold}
                  timeout="auto"
                  unmountOnExit
                  key={`${chapter.id}-${index}`}
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
                          backgroundColor: "rgba(155, 155, 155, 0.2)",
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
                        primary={chapter.name}
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
