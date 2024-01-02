import * as React from "react";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

const toolBarHeight = 180;

const TextArea = styled.textarea.attrs(() => ({
  placeholder: "Type something...",
}))`
  resize: none;
  all: unset;
  width: 100%;
  height: calc(100vh - ${toolBarHeight}px);
  text-align: left;
  /* padding: 20px 25px; */
  color: #2e4af3;
  overflow-y: scroll;
  letter-spacing: 0.5px;
  line-height: 22px;
`;

export default function TextareaRef(props) {
  return (
    <TextArea
      // value={props.testContent}
      value={props.markdownText}
      onChange={props.handleInputChange}
    />
  );
}
