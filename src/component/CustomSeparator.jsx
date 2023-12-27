import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomSeparator() {
  const breadcrumbs = [
    <Link
      //   underline="hover"
      underline="none"
      key="1"
      color="inherit"
      //   href="/"
      //   onClick={handleClick}
    >
      Notebooks
    </Link>,
    <Link
      //   underline="hover"
      underline="none"
      key="1"
      color="inherit"
      //   href="/"
      //   onClick={handleClick}
    >
      Data Structure
    </Link>,
    <Link
      //   underline="hover"
      underline="none"
      key="2"
      color="inherit"
      //   href="/material-ui/getting-started/installation/"
      //   onClick={handleClick}
    >
      Tree Algorithm
    </Link>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
