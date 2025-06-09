import * as React from "react";
import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

export default function CustomSeparator(props) {
  const { theme } = props;

  const [notebookName, setNotebookName] = useState("");
  const [chapterName, setChapterName] = useState("");

  const allNotebookData = useSelector((state) => state.notebookData.notebooks);
  const notebookIndex = useSelector(
    (state) => state.notebookData.focusNotebookAndChapterIndex.notebookIndex
  );
  const chapterIndex = useSelector(
    (state) => state.notebookData.focusNotebookAndChapterIndex.chapterIndex
  );

  const isNotebookMode = useSelector((state) => state.viewListener.isGanttMode);

  useEffect(() => {
    let tempNotebookName = "";
    let tempChapterName = "";
    if (allNotebookData[notebookIndex] !== undefined) {
      tempNotebookName =
        allNotebookData[notebookIndex].chapters === undefined
          ? null
          : allNotebookData[notebookIndex]?.name;
      tempChapterName =
        allNotebookData[notebookIndex].chapters === undefined
          ? null
          : allNotebookData[notebookIndex]?.chapters[chapterIndex]?.name;
    } else {
      tempNotebookName = null;
      tempChapterName = null;
    }

    setNotebookName(tempNotebookName);
    setChapterName(tempChapterName);
  }, [allNotebookData, notebookIndex, chapterIndex]);

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          color="primary"
        >
          {isNotebookMode ? (
            <Link
              //   underline="hover"
              underline="none"
              key="1"
              color="inherit"
              sx={{
                color: `${theme.palette.primary.main}`,
              }}
            >
              All Notebooks Gantt
            </Link>
          ) : null}
          {isNotebookMode ? null : (
            <Link
              //   underline="hover"
              underline="none"
              key="1"
              color="inherit"
            >
              {notebookName}
            </Link>
          )}
          {isNotebookMode ? null : (
            <Link
              //   underline="hover"
              underline="none"
              key="2"
              color="inherit"
            >
              {chapterName}
            </Link>
          )}
        </Breadcrumbs>
      </Stack>
    </ThemeProvider>
  );
}
