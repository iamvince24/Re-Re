import { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CustomSeparator from "./CustomSeparator";
import DatePickerValue from "./DatePickerValue";
import TextareaRef from "./TextareaRef";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";

import { useSpring, animated } from "react-spring";
import Markdown from "react-markdown";
import {
  getDatabase,
  set,
  remove,
  update,
  ref,
  push,
  child,
} from "firebase/database";

const barHeight = 70;
const drawerWidth = 350;
const toolBarHeight = 180;

const TextArea = styled("text")(() => ({
  resize: "none",
  all: "unset",
  width: "100%",
  height: `calc(100vh - ${toolBarHeight}px)`,
  textAlign: "left",
  color: "#2E4AF3",
  letterSpacing: "0.5px",
  lineHeight: "30px",
  display: "flex",
  flexDirection: "column",
  alignContent: "flex-start",
}));

export default function NotebookMode(props) {
  const [toggleNotebookDisplay, setToggleNotebookDisplay] = useState(false);

  const { notebookData, notebookDisplay } = props;

  const targetNotebook = notebookData.filter((notebook) => {
    if (notebook.id === notebookDisplay.notebookId) {
      return notebook;
    }
  });

  const chapter = targetNotebook[0].Chapters.filter((chapter) => {
    if (chapter.id === notebookDisplay.chapterId) {
      return chapter;
    }
  });

  const [chapterName, setChapterName] = useState(chapter[0]?.name);
  const [markdownText, setMarkdownText] = useState(chapter[0]?.content);

  const uid = window.localStorage.getItem("uid");
  let notebookIdForFunc = 0;
  let chapterIdForFunc = 0;

  for (var i = 0; i < props.notebookData.length; i++) {
    if (notebookData[i]?.id === notebookDisplay.notebookId) {
      notebookIdForFunc = i;
      if (notebookDisplay.chapterId !== undefined) {
        for (var j = 0; j < props.notebookData[i].Chapters.length; j++) {
          if (
            notebookData[notebookIdForFunc].Chapters[j]?.id ===
            notebookDisplay.chapterId
          ) {
            chapterIdForFunc = j;
            break;
          }
        }
      } else {
        break;
      }
    }
  }

  const handleDrawerOpen = () => {
    props.setOpen(true);
  };

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };

  const handleUpdateNotebookContent = (content) => {
    setToggleNotebookDisplay(false);

    const db = getDatabase();
    const postData = {
      ...chapter[0],
      content: content,
    };

    const dataPath = `/users/${uid}/notebooks/${notebookIdForFunc}/Chapters/${chapterIdForFunc}`;
    const updates = {};
    updates[dataPath] = postData;

    return update(ref(db), updates);
  };

  useEffect(() => {
    setChapterName(chapter[0]?.name);
    setMarkdownText(chapter[0]?.content);
  }, [props.notebookData, props.notebookDisplay]);

  return (
    <Fragment>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: "180px",
            padding: "0px 20px 20px",
            borderBottom: "3px solid #F2D4CC",
          }}
        >
          <Box sx={{ height: "70px", display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                ...(props.open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: "#2E4AF3" }} />
            </IconButton>
            <CustomSeparator
              notebookData={notebookData}
              notebookDisplay={notebookDisplay}
              mode={props.mode}
            />
          </Box>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 900,
              fontSize: "36px",
              color: "#2E4AF3",
              textTransform: "capitalize",
              textAlign: "left",
              marginTop: "-12.5px",
            }}
          >
            {chapterName}
          </Typography>
          <Box
            sx={{
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DatePickerValue
              notebookData={notebookData}
              notebookDisplay={notebookDisplay}
            />
            {toggleNotebookDisplay ? (
              <Button
                sx={{
                  background: "rgb(112, 132, 255, 0.1)",
                  textTransform: "capitalize",
                  color: "#2E4AF3",
                  height: "42px",
                  padding: "0px 15px",
                  marginTop: "-10px",
                  letterSpacing: "0.5px",
                }}
                onClick={() => handleUpdateNotebookContent(markdownText)}
              >
                Done
              </Button>
            ) : (
              <Button
                sx={{
                  background: "rgb(112, 132, 255, 0.1)",
                  textTransform: "capitalize",
                  color: "#2E4AF3",
                  height: "42px",
                  padding: "0px 15px",
                  marginTop: "-10px",
                  letterSpacing: "0.5px",
                }}
                onClick={() => setToggleNotebookDisplay(true)}
              >
                To Editor Markdown
              </Button>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: "20px",
            lineHeight: "30px",
            overflowY: "scroll",
            height: `calc(100vh - ${toolBarHeight}px)`,
          }}
        >
          {toggleNotebookDisplay ? (
            <TextareaRef
              testContent={
                notebookData[notebookIdForFunc]?.Chapters[chapterIdForFunc]
                  .content
              }
              notebookData={props.notebookData}
              notebookDisplay={props.notebookDisplay}
              markdownText={markdownText}
              handleInputChange={handleInputChange}
            />
          ) : (
            <TextArea>
              <Markdown>{markdownText}</Markdown>
            </TextArea>
          )}
        </Box>
      </Box>
    </Fragment>
  );
}
