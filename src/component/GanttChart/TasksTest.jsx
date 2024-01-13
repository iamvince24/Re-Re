import * as React from "react";
import { Fragment } from "react";
import { useEffect, useRef } from "react";
import NotebookListGantt from "./NotebookListGantt";

export default function TasksTest(
  {
    tasks,
    setTasks,
    setTaskDurations,
    notebookData,
    ganttUnfoldList,
    setGanttUnfoldList,
    theme,
  },
  props
) {
  const [open, setOpen] = React.useState(true);

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
        {notebookData &&
          notebookData.map((notebook, index) => (
            <NotebookListGantt
              theme={theme}
              notebook={notebook}
              key={`${notebook.id}-${index}`}
              ganttUnfoldList={ganttUnfoldList}
              setGanttUnfoldList={setGanttUnfoldList}
              isSmallScreen={props.isSmallScreen}
            />
          ))}
      </div>
      <style>
        {`
          #gantt-grid-container__tasks {
            border-right: 1px solid var(--color-Tasks-Border-Bottom);
            overflow: auto;
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
