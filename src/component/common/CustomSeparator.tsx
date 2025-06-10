import * as React from "react";
import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ThemeProvider, Theme } from "@mui/material/styles";
import { useSelector } from "react-redux";

interface CustomSeparatorProps {
  theme: Theme;
}

interface RootState {
  notebookData: {
    notebooks: Array<{
      name: string;
      chapters?: Array<{
        name: string;
      }>;
    }>;
    focusNotebookAndChapterIndex: {
      notebookIndex: number;
      chapterIndex: number;
    };
  };
  viewListener: {
    isGanttMode: boolean;
  };
}

export default function CustomSeparator(props: CustomSeparatorProps) {
  const { theme } = props;

  const [notebookName, setNotebookName] = useState<string | null>("");
  const [chapterName, setChapterName] = useState<string | null>("");

  const allNotebookData = useSelector((state: RootState) => state.notebookData.notebooks);
  const notebookIndex = useSelector(
    (state: RootState) => state.notebookData.focusNotebookAndChapterIndex.notebookIndex
  );
  const chapterIndex = useSelector(
    (state: RootState) => state.notebookData.focusNotebookAndChapterIndex.chapterIndex
  );

  const isNotebookMode = useSelector((state: RootState) => state.viewListener.isGanttMode);

  useEffect(() => {
    let tempNotebookName: string | null = "";
    let tempChapterName: string | null = "";
    if (allNotebookData[notebookIndex] !== undefined) {
      tempNotebookName =
        allNotebookData[notebookIndex].chapters === undefined
          ? null
          : allNotebookData[notebookIndex]?.name;
      tempChapterName =
        allNotebookData[notebookIndex].chapters === undefined
          ? null
          : allNotebookData[notebookIndex]?.chapters?.[chapterIndex]?.name;
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
