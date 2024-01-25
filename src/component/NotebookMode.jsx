import { Fragment, useState, useEffect } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material/Button";
import CustomSeparator from "./CustomSeparator";
import DatePickerValue from "./DatePickerValue";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import { ThemeProvider } from "@mui/material/styles";
import Markdown from "react-markdown";
import { getDatabase, update, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { handleSidebarOpen } from "../redux/action";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

// const barHeight = 70;
// const drawerWidth = 350;
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
  const { dispatch, theme } = props;

  const allNotebookData = useSelector((state) => state.notebookData.notebooks);
  const screenSmall767 = useSelector(
    (state) => state.viewListener.screenWidth767
  );
  const isNotebookMode = useSelector(
    (state) => state.viewListener.viewModeisNotebook
  );
  const isSidebarOpen = useSelector((state) => state.viewListener.sidebarOpen);

  const notebookIndex = useSelector(
    (state) => state.notebookData.focusNotebookAndChapterIndex.notebookIndex
  );
  const chapterIndex = useSelector(
    (state) => state.notebookData.focusNotebookAndChapterIndex.chapterIndex
  );

  const [toggleNotebookDisplay, setToggleNotebookDisplay] = useState(false);

  const [chapterName, setChapterName] = useState("");
  const [markdownText, setMarkdownText] = useState("");

  const uid = window.localStorage.getItem("uid");

  const handleDrawerOpen = () => {
    dispatch(handleSidebarOpen(true));
  };

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };

  const handleUpdateNotebookContent = (content) => {
    setToggleNotebookDisplay(false);

    const db = getDatabase();
    const postData = {
      ...allNotebookData[notebookIndex]?.chapters[chapterIndex],
      content: content,
    };

    const dataPath = `/users/${uid}/notebooks/${notebookIndex}/chapters/${chapterIndex}`;
    const updates = {};
    updates[dataPath] = postData;

    return update(ref(db), updates);
  };

  const customCodeStyle = {
    backgroundColor: "#1F2937",
    borderRadius: "8px", // Adjust the radius according to your preference
    padding: "12px", // Adjust the padding according to your preference
    margin: "0",
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setToggleNotebookDisplay(false);
    }
  };

  useEffect(() => {
    setMarkdownText(
      allNotebookData[notebookIndex]?.chapters[chapterIndex]?.content
    );
    setChapterName(
      allNotebookData[notebookIndex]?.chapters[chapterIndex]?.name
    );
  }, [allNotebookData, notebookIndex, chapterIndex]);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: "100vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              height: screenSmall767 ? "auto" : "180px",
              padding: "0px 20px 20px",
              borderBottom: screenSmall767
                ? `1px solid ${theme.palette.dividerBorder.main}`
                : `1px solid ${theme.palette.dividerBorder.main}`,
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
                  ...(isSidebarOpen && { display: "none" }),
                }}
              >
                <MenuIcon sx={{ color: `${theme.palette.primary.main}` }} />
              </IconButton>
              <CustomSeparator theme={theme} />
            </Box>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: "36px",
                color: `${theme.palette.primary.main}`,
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
                flexDirection: screenSmall767 ? "column" : "row",
                justifyContent: "space-between",
                alignItems: screenSmall767 ? "flex-start" : "center",
                gap: screenSmall767 ? "20px" : "none",
              }}
            >
              <DatePickerValue theme={theme} />
              {toggleNotebookDisplay ? (
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      color: `${theme.palette.secondary.main}`,
                      height: screenSmall767 ? "35px" : "42px",
                      padding: "0px 15px",
                      letterSpacing: "0.5px",
                      boxShadow: "none",
                      fontWeight: 700,
                      marginRight: "15px",
                    }}
                    onClick={() => setToggleNotebookDisplay(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      color: `${theme.palette.secondary.main}`,
                      height: screenSmall767 ? "35px" : "42px",
                      padding: "0px 15px",
                      letterSpacing: "0.5px",
                      boxShadow: "none",
                      fontWeight: 700,
                    }}
                    onClick={() => handleUpdateNotebookContent(markdownText)}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    color: `${theme.palette.secondary.main}`,
                    height: screenSmall767 ? "35px" : "42px",
                    padding: "0px 15px",
                    letterSpacing: "0.5px",
                    boxShadow: "none",
                    fontWeight: 700,
                  }}
                  onClick={() => setToggleNotebookDisplay(true)}
                >
                  To Markdown Editor
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
                autoFocus
                onKeyDown={handleKeyDown}
              />
            ) : (
              <TextArea>
                <ReactMarkdown
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          className="MarkdownStyle"
                          style={{ ...nightOwl, ...customCodeStyle }}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {markdownText}
                </ReactMarkdown>
              </TextArea>
            )}
          </Box>
        </Box>
      </ThemeProvider>
      <style>
        {`
        .MarkdownStyle {
          overflow: auto;
          border-radius: 5px;
        }
        `}
      </style>
    </Fragment>
  );
}
