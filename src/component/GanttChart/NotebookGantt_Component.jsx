import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  createFormattedDateFromDate,
  dayDiff,
} from "../../utils/dateFunctions";
import { v4 as uuidv4 } from "uuid";
import { months } from "../../utils/constants";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/joy/Typography";
import Brightness1Icon from "@mui/icons-material/Brightness1";

export default function NotebookGanttComponent(props) {
  const {
    theme,
    id,
    notebook,
    timeRange,
    startMonth,
    numMonths,
    taskDurations,
    setTaskDurations,
    ganttTimePeriod,
    ganttTimePeriodCell,
    ganttUnfoldList,
  } = props;

  const unfold = ganttUnfoldList.list.includes(id) ? "block" : "none";
  const startDate = `${timeRange.fromSelectYear}-${
    months[timeRange.fromSelectMonth]
  }-01`;

  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState(null);
  function handleDragStart(taskDurationId) {
    setTaskDurationElDraggedId(taskDurationId);
  }

  const [contextMenu, setContextMenu] = useState(null);
  const handleContextMenu = (event, taskId, formattedDate) => {
    event.preventDefault();
    const mouseX = event.clientX + 2;
    const mouseY = event.clientY - 6;
    setContextMenu({
      mouseX,
      mouseY,
      taskId,
      formattedDate,
    });
  };
  const handleClose = () => {
    setContextMenu(null);
  };

  let taskRows = [];
  let notebookTitleRow = [];
  let chapterRows = [];
  let chapterRow = [];
  let mnth = new Date(startMonth);

  for (let i = 0; i < numMonths; i++) {
    const curYear = mnth.getFullYear();
    const curMonth = mnth.getMonth() + 1;
    const numDays = getDaysInMonth(curYear, curMonth);

    for (let j = 1; j <= numDays; j++) {
      // color weekend cells differently
      const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);

      // add task and date data attributes
      const formattedDate = createFormattedDateFromStr(curYear, curMonth, j);

      notebookTitleRow.push(
        <div
          key={uuidv4()}
          style={{
            // ...ganttTimePeriodCell,
            position: "relative",
            padding: "0.5px 0px",
            display: "flex",
            borderRight:
              "0.5px solid var(--color-TimeTable-TaskRow-BorderRight)",
            backgroundColor:
              dayOfTheWeek === "S"
                ? `${theme.palette.ganttHoliday.main}`
                : "none",
          }}
          data-task={notebook.id}
          data-date={formattedDate}
          //   onDrop={onTaskDurationDrop}
        ></div>
      );
    }

    mnth.setMonth(mnth.getMonth() + 1);
  }

  notebookTitleRow.push(
    <div
      key={uuidv4()}
      style={{
        position: "absolute",
        height: "40px",
        padding: "0.5px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRight: "0.5px solid var(--color-TimeTable-TaskRow-BorderRight)",
        left: `calc((${dayDiff(
          startDate,
          notebook.start
        )} - 2 ) * var(--width-Days))`,
      }}
      data-task={notebook.id}
      //   onDrop={onTaskDurationDrop}
    >
      <div
        className="taskDuration"
        key={uuidv4()}
        draggable="true"
        tabIndex="0"
        // onDragStart={() => handleDragStart(notebook.id)}
        style={{
          position: "relative",
          height: "calc(var(--cell-height) - 10px)",
          zIndex: "5",
          background:
            "linear-gradient(90deg, var(--color-taskDuration-left) 30%, var(--color-taskDuration-right) 100%)",
          borderRadius: "var(--border-radius)",
          boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
          cursor: "move",
          alignSelf: "center",
          justifyItems: "center",
          width: `calc(${dayDiff(
            notebook.start,
            notebook.end
          )} * var(--width-Days))`,
          opacity: taskDurationElDraggedId === notebook.id ? "0.5" : "1",
        }}
        onKeyDown={(e) => deleteTaskDuration(e, notebook.id)}
        onContextMenu={(e) => handleContextMenu(e, notebook.id)}
      ></div>
    </div>
  );

  taskRows.push(
    <div
      // key={`${index}-${notebook.id}`}
      key={uuidv4()}
      className="taskRow"
      style={{
        ...ganttTimePeriod,
      }}
    >
      {notebookTitleRow}
    </div>
  );
  notebookTitleRow = [];

  notebook.Chapters?.map((chapter) => {
    let chapterMnth = new Date(startMonth);
    for (let i = 0; i < numMonths; i++) {
      const curYear = chapterMnth.getFullYear();
      const curMonth = chapterMnth.getMonth() + 1;
      const numDays = getDaysInMonth(curYear, curMonth);

      for (let j = 1; j <= numDays; j++) {
        // color weekend cells differently
        const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);
        // add task and date data attributes
        const formattedDateInner = createFormattedDateFromStr(
          curYear,
          curMonth,
          j
        );
        chapterRow.push(
          <div
            key={uuidv4()}
            style={{
              ...ganttTimePeriodCell,
              borderRight:
                "0.5px solid var(--color-TimeTable-TaskRow-BorderRight)",
              backgroundColor:
                dayOfTheWeek === "S"
                  ? `${theme.palette.ganttHoliday.main}`
                  : "none",
            }}
            data-task={chapter.id}
            data-date={formattedDateInner}
            //   onDrop={onTaskDurationDrop}
          ></div>
        );
      }

      chapterMnth.setMonth(chapterMnth.getMonth() + 1);
    }

    chapterRow.push(
      <div
        key={uuidv4()}
        style={{
          height: "40px",
          padding: "0.5px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          borderRight: "0.5px solid var(--color-TimeTable-TaskRow-BorderRight)",
          left: `calc((${dayDiff(
            startDate,
            chapter.start
          )} - 2 ) * var(--width-Days))`,
        }}
        data-task={notebook.id}
      >
        <div
          key={uuidv4()}
          className="taskDuration"
          draggable="true"
          tabIndex="0"
          onDragStart={() => handleDragStart(notebook.id)}
          style={{
            // ...taskDuration,
            position: "relative",
            height: "calc(var(--cell-height) - 10px)",
            zIndex: "5",
            background:
              "linear-gradient(90deg, var(--color-taskDuration-left) 10%, var(--color-taskDuration-right) 100%)",
            borderRadius: "var(--border-radius)",
            boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
            cursor: "move",
            alignSelf: "center",
            justifyItems: "center",
            width: `calc(${dayDiff(
              chapter.start,
              chapter.end
            )} * var(--width-Days))`,
            opacity: taskDurationElDraggedId === notebook.id ? "0.5" : "1",
          }}
        ></div>
      </div>
    );

    chapterRows.push(
      <div
        key={uuidv4()}
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(var(--width-Days), 1fr)",
          textAlign: "center",
          height: "var(--cell-height)",
        }}
      >
        {chapterRow}
      </div>
    );

    taskRows.push(
      <div key={uuidv4()} className="taskRow" style={{ display: `${unfold}` }}>
        {chapterRows}
      </div>
    );
    chapterRows = [];
    chapterRow = [];
  });

  function deleteTaskDuration(e, id) {
    if (e.key === "Delete" || e.key === "Backspace") {
      // update taskDurations
      const newTaskDurations = taskDurations.filter(
        (taskDuration) => taskDuration.id !== id
      );
      // update state (if data on backend - make API request to update data)
      setTaskDurations(newTaskDurations);
    }
  }

  return (
    <Fragment>
      {taskRows}
      <style>
        {`
          .taskDuration {
            // background-image: url("./assets/img/noise_white.png");
          }
        `}
      </style>
      {contextMenu && (
        <Menu
          open={true}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: contextMenu.mouseY, left: contextMenu.mouseX }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{ gap: "5px", color: "var(--primary-color)" }}
          >
            <Brightness1Icon />
            <Typography sx={{ color: "var(--primary-color)" }}>Blue</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ gap: "5px", color: "#fbd07c" }}>
            <Brightness1Icon />
            <Typography sx={{ color: "#fbd07c" }}>Yellow</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ gap: "5px", color: "#43b692" }}>
            <Brightness1Icon />
            <Typography sx={{ color: "#43b692" }}>Green</Typography>
          </MenuItem>
        </Menu>
      )}
    </Fragment>
  );
}
