import * as React from "react";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import { Fragment } from "react";
import styled from "styled-components";

const toolBarHeight = 180;

const TextArea = styled("textarea")(() => ({
  resize: "none",
  all: "unset",
  width: "100%",
  height: `calc(100vh - ${toolBarHeight}px)`,
  textAlign: "left",
  padding: "20px 25px",
  color: "#2E4AF3",
  overflow: "scroll",
  letterSpacing: "0.5px",
  lineHeight: "22px",
}));

export default function TextareaRef(props) {
  return (
    <Fragment>
      <Stack
        direction="row"
        gap={1}
        sx={{
          width: "100%",
        }}
      >
        <TextArea placeholder="Type something..." />
      </Stack>
    </Fragment>
  );
}
