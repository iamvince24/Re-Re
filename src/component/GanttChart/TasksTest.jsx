import * as React from "react";
import { Fragment } from "react";
import { useEffect, useRef } from "react";
import NotebookListGantt from "./NotebookListGantt";
import { useSelector, useDispatch } from "react-redux";

export default function TasksTest({ theme }) {
  const allNotebookData = useSelector((state) => state.notebookData.notebooks);

  const inputRef = useRef([]);
  const indexRef = useRef(null);

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });

  return (
    <Fragment>
      <div id="gantt-grid-container__tasks">
        <div className="gantt-task-row-empty"></div>
        <div className="gantt-task-row-empty"></div>
        {allNotebookData &&
          allNotebookData?.map((notebook, index) => (
            <NotebookListGantt
              theme={theme}
              notebook={notebook}
              index={index}
              key={`${notebook.id}-${index}`}
            />
          ))}
      </div>
      <style>
        {`
          #gantt-grid-container__tasks {
            border-right: 1px solid var(--color-Tasks-Border-Bottom);
            overflow: "hidden",
          }

          .gantt-task-row-empty {
            display: flex;
            text-align: center;
            height: var(--cell-height);
            // border-bottom: 1px solid var(--color-Tasks-Border-Bottom);
            border-bottom: 1px solid ${theme.palette.primary.main};
       
          }

          .gantt-task-row {
            display: flex;
            text-align: center;
            height: var(--cell-height);
            border-bottom: 0.5px solid var(--color-Tasks-Border-Bottom);
          }
        `}
      </style>
    </Fragment>
  );
}
