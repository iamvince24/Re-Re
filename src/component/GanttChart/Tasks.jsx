import * as React from "react";
import { Fragment } from "react";
import { useEffect, useRef } from "react";
import LongMenu from "../LongMenu";

import ContextItem from "../ContextItem";

export default function Tasks({ tasks, setTasks, setTaskDurations }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  const handleDelete = (id) => (e) => {
    // console.log(e.target.getAttribute("data-task-id"));
    const idNum = id;
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
    // const value = ;
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
        <div className="gantt-task-row"></div>
        <div className="gantt-task-row"></div>

        {tasks &&
          tasks.map((tsk, i) => (
            <div key={`${i}-${tsk.id}-${tsk.name}`} className="gantt-task-row">
              <ContextItem
                data-task-id={tsk.id}
                num={tsk.id}
                value={tsk.name}
                // onChange={(e) => onChange(e, i)}
                onChange={onChange}
                ref={(el) => (inputRef.current[i] = el)}
                i={i}
                handleDelete={handleDelete}
              />
            </div>
          ))}
      </div>
      <style>
        {`
          #gantt-grid-container__tasks {
            // outline: 0.5px solid var(--color-outline);
          }

          .gantt-task-row {
            display: flex;
            // outline: 0.5px solid var(--color-outline);
            text-align: center;
            height: var(--cell-height);
            // height: 20px;
            // border: none;
            // border-bottom: 0.3px solid white;
            border-bottom: 0.5px solid white;
          }

          input {
            width: 127px;
            padding-left: 10px;
            border: none;
            outline: none;
            background: none;
          }

          // button {
          //   line-height: 0px;
          //   color: var(--color-orange);
          //   background: none;
          //   border-radius: 5px;
          //   border: none;
          //   transition: all 0.2s ease;
          // }

          // button:focus {
          //   outline: none;
          //   transform: scale(1.3);
          // }
        `}
      </style>
    </Fragment>
  );
}
