import * as React from "react";
import { Fragment } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ThemeProvider } from "@mui/material/styles";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomSeparator(props) {
  const { notebookData, notebookDisplay, mode } = props;

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

  // const breadcrumbs = [
  //   <Link
  //     //   underline="hover"
  //     underline="none"
  //     key="1"
  //     color="inherit"
  //   >
  //     All
  //   </Link>,
  //   <Link
  //     //   underline="hover"
  //     underline="none"
  //     key="1"
  //     color="inherit"
  //   >
  //     {notebookData[notebookDisplay.notebookId - 1].name}
  //   </Link>,
  //   <Link
  //     //   underline="hover"
  //     underline="none"
  //     key="2"
  //     color="inherit"
  //   >
  //     {
  //       notebookData[notebookDisplay.notebookId - 1].Chapters[
  //         notebookDisplay.chapterId - 1
  //       ].name
  //     }
  //   </Link>,
  // ];

  return (
    <ThemeProvider theme={props.theme}>
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          color="primary"
        >
          {mode ? (
            <Link
              //   underline="hover"
              underline="none"
              key="1"
              color="inherit"
              sx={{ color: `${props.theme.palette.primary.main}` }}
            >
              All Notebooks Gantt
            </Link>
          ) : (
            <Link
              //   underline="hover"
              underline="none"
              key="1"
              color="inherit"
            >
              All
            </Link>
          )}
          {mode ? null : (
            <Link
              //   underline="hover"
              underline="none"
              key="1"
              color="inherit"
            >
              {targetNotebook[0]?.name}
            </Link>
          )}
          {mode ? null : (
            <Link
              //   underline="hover"
              underline="none"
              key="2"
              color="inherit"
            >
              {chapter[0]?.name}
            </Link>
          )}
        </Breadcrumbs>
      </Stack>
    </ThemeProvider>
  );
}
