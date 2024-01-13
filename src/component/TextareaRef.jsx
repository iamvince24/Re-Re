import * as React from "react";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

const toolBarHeight = 180;

export default function TextareaRef(props) {
  const TextArea = styled.textarea.attrs(() => ({
    placeholder: "Type something...",
  }))`
    resize: none;
    all: unset;
    width: 100%;
    height: calc(100vh - ${toolBarHeight}px);
    text-align: left;
    /* padding: 20px 25px; */
    color: ${props.theme.palette.primary.main};
    overflow-y: scroll;
    letter-spacing: 0.5px;
    line-height: 22px;
  `;

  return (
    <TextArea
      // value={props.testContent}
      value={props.markdownText}
      onChange={props.handleInputChange}
    />
  );
}
