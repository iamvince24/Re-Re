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
import { ThemeProvider } from "@mui/material/styles";

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

const TextEditor = styled.textarea.attrs(() => ({
  placeholder: "Type something...",
}))`
  resize: none;
  all: unset;
  width: 100%;
  height: calc(100vh - ${toolBarHeight}px);
  text-align: left;
  color: #f4f4f3;
  overflow-y: scroll;
  letter-spacing: 0.5px;
  line-height: 22px;
`;

const TextArea = styled("div")(() => ({
  resize: "none",
  all: "unset",
  width: "100%",
  height: `calc(100vh - ${toolBarHeight}px)`,
  textAlign: "left",
  color: "#F4F4F3",
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
  }, [notebookData, notebookDisplay]);

  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        <Box
          sx={{
            height: "100vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              height: props.isSmallScreen ? "auto" : "180px",
              padding: "0px 20px 20px",
              borderBottom: props.isSmallScreen
                ? `1.5px solid ${props.theme.palette.dividerBorder.main}`
                : `3px solid ${props.theme.palette.dividerBorder.main}`,
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
                <MenuIcon
                  sx={{ color: `${props.theme.palette.primary.main}` }}
                />
              </IconButton>
              <CustomSeparator
                theme={props.theme}
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
                // color: "#2E4AF3",
                color: `${props.theme.palette.primary.main}`,
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
                flexDirection: props.isSmallScreen ? "column" : "row",
                justifyContent: "space-between",
                alignItems: props.isSmallScreen ? "flex-start" : "center",
                // marginTop: "35px",
                gap: props.isSmallScreen ? "20px" : "none",
              }}
            >
              <DatePickerValue
                theme={props.theme}
                notebookData={notebookData}
                notebookDisplay={notebookDisplay}
                isSmallScreen={props.isSmallScreen}
              />
              {toggleNotebookDisplay ? (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    color: `${props.theme.palette.secondary.main}`,
                    height: props.isSmallScreen ? "35px" : "42px",
                    padding: "0px 15px",
                    letterSpacing: "0.5px",
                    boxShadow: "none",
                    fontWeight: 700,
                  }}
                  onClick={() => handleUpdateNotebookContent(markdownText)}
                >
                  Done
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    // background: "rgb(112, 132, 255, 0.1)",
                    textTransform: "capitalize",
                    color: `${props.theme.palette.secondary.main}`,
                    height: props.isSmallScreen ? "35px" : "42px",
                    padding: "0px 15px",
                    letterSpacing: "0.5px",
                    boxShadow: "none",
                    fontWeight: 700,
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
              <TextEditor
                value={markdownText}
                onChange={handleInputChange}
                className="textEditor"
              />
            ) : (
              <TextArea>
                <Markdown>{markdownText}</Markdown>
              </TextArea>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
