import * as React from "react";
import { Fragment } from "react";
import { useEffect, useRef } from "react";
import NotebookListGantt from "./NotebookListGantt";

export default function TasksTest({
  tasks,
  setTasks,
  setTaskDurations,
  notebookData,
  ganttUnfoldList,
  setGanttUnfoldList,
}) {
  const [open, setOpen] = React.useState(true);

  const inputRef = useRef([]);
  const indexRef = useRef(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const handleDelete = (id) => (e) => {
    // console.log(e.target.getAttribute("data-task-id"));
    const idNum = id;
    // const newTasks = tasks.filter((task) => task.id !== idNum);
    const newTasks = tasks.filter((task) => task.id !== idNum);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
    setTaskDurations((prevState) => {
      // delete any taskDurations associated with the task
      const newTaskDurations = prevState.filter(
        (taskDuration) => taskDuration.task !== idNum
      );
      return newTaskDurations;
    });
  };

  function onChange(value, num) {
    // const { value } = e.target;
    // const idNum = parseInt(e.target.getAttribute("data-task-id"));
    const idNum = num;

    let newTasks = tasks.filter((task) => task.id !== idNum);
    newTasks.push({ id: idNum, name: value });
    newTasks = newTasks.sort((a, b) => a.id - b.id);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
  }

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
              notebook={notebook}
              key={`${notebook.id}-${index}`}
              ganttUnfoldList={ganttUnfoldList}
              setGanttUnfoldList={setGanttUnfoldList}
            />
          ))}
      </div>
      <style>
        {`
          #gantt-grid-container__tasks {
            // outline: 0.5px solid var(--color-outline);
            border-right: 1px solid var(--color-Tasks-Border-Bottom);
          }

          .gantt-task-row-empty {
            display: flex;
            text-align: center;
            height: var(--cell-height);
            border-bottom: 1px solid var(--color-Tasks-Border-Bottom);
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
