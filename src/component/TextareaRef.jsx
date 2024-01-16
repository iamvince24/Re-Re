import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

const toolBarHeight = 180;

export default function TextareaRef(props) {
  const [text, setText] = useState(props.markdownText || "");

  const TextArea = styled.textarea.attrs(() => ({
    placeholder: "Type something...",
    value: text,
    onChange: (e) => setText(e.target.value),
  }))`
    resize: none;
    all: unset;
    width: 100%;
    height: calc(100vh - ${toolBarHeight}px);
    text-align: left;
    color: ${props.theme.palette.primary.main};
    overflow-y: scroll;
    letter-spacing: 0.5px;
    line-height: 22px;
  `;

  return (
    <TextArea value={props.markdownText} onChange={props.handleInputChange} />
  );
}
