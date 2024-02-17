import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import {
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  dayDiff,
} from "../../../utils/dateFunctions";
import { v4 as uuidv4 } from "uuid";
import { months } from "../../../utils/constants";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/joy/Typography";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { getDatabase, ref, update } from "firebase/database";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

export default function GanttChartComponent(props) {
  const {
    notebookData,
    theme,
    notebookIndex,
    notebook,
    timeRange,
    startMonth,
    numMonths,
    taskDurations,
    setTaskDurations,
    ganttTimePeriod,
    ganttTimePeriodCell,
  } = props;

  const allNotebookData = useSelector((state) => state.notebookData.notebooks);

  const isUnfold = useSelector((state) =>
    state.viewListener.ganttUnfold[notebookIndex] ? "block" : "none"
  );

  const startDate = `${timeRange.fromSelectYear}-${
    months[timeRange.fromSelectMonth]
  }-01`;

  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [targetType, setTargetType] = useState(null);
  const [chapterIndex, setChapterIndex] = useState(null);

  if (allNotebookData === undefined) {
    console.log(undefined);
  }

  // let earliestDate =
  //   allNotebookData === undefined
  //     ? "2024-01-01"
  //     : allNotebookData.chapters === undefined
  //     ? "2024-01-01"
  //     : new Date(notebook?.chapters[0]?.start);
  let earliestDate =
    notebook?.chapters === undefined
      ? "2024-01-02"
      : new Date(notebook?.chapters[0]?.start);
  let latestDate = new Date("2024-01-02");

  notebook.chapters?.forEach((chapter) => {
    const startDate = new Date(chapter.start);
    const endDate = new Date(chapter.end);
    if (startDate < earliestDate) {
      earliestDate = startDate;
    }
    if (endDate > latestDate) {
      latestDate = endDate;
    }
  });

  const dateFormat = "YYYY-MM-DD";
  const [notebookStart, notebookEnd] = [
    dayjs(earliestDate).format(dateFormat),
    dayjs(latestDate).format(dateFormat),
  ];

  const updatedNotebookTimeRange = (startDate, endDate) => {
    const uid = window.localStorage.getItem("uid");
    const db = getDatabase();

    const updates = {};
    updates["/users/" + uid + "/notebooks/" + notebookIndex + "/start/"] =
      startDate;
    updates["/users/" + uid + "/notebooks/" + notebookIndex + "/end/"] =
      endDate;
    update(ref(db), updates);
  };

  useEffect(() => {
    if (allNotebookData !== undefined) {
      updatedNotebookTimeRange(
        dayjs(earliestDate).format(dateFormat),
        dayjs(latestDate).format(dateFormat)
      );
    }
  });

  const handleContextMenu = (event, target, index) => {
    event.preventDefault();
    setTargetType(target);
    setChapterIndex(index);
    const mouseX = event.clientX + 2;
    const mouseY = event.clientY - 6;
    setContextMenu({
      mouseX,
      mouseY,
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

  const noteBookColor = notebook.color;

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
          margin: "0px 5px",
          zIndex: "5",
          background: `linear-gradient(90deg, ${theme.palette.colorOption[noteBookColor]?.gradient.gradientLeft} 10%, ${theme.palette.colorOption[noteBookColor]?.gradient.gradientRight} 100%)`,
          borderRadius: "var(--border-radius)",
          boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
          cursor: "context-menu",
          alignSelf: "center",
          justifyItems: "center",
          width: `calc(${dayDiff(
            notebookStart,
            notebookEnd
          )} * var(--width-Days) - 5px)`,
          opacity: taskDurationElDraggedId === notebook.id ? "0.5" : "1",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
        onKeyDown={(e) => deleteTaskDuration(e, notebook.id)}
        onContextMenu={(e) => handleContextMenu(e, "notebook", null)}
      >
        <div style={{ marginLeft: "10px", whiteSpace: "nowrap" }}>
          {notebook.name}
        </div>
      </div>
    </div>
  );

  taskRows.push(
    <div
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

  notebook.chapters?.map((chapter, index) => {
    const chapterColor = chapter.color;
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
          position: "absolute",
          height: "40px",
          padding: "0.5px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "0.5px solid var(--color-TimeTable-TaskRow-BorderRight)",
          left: `calc((${dayDiff(
            startDate,
            chapter.start
          )} - 2 ) * var(--width-Days))`,
        }}
        data-task={notebook.id}
      >
        <div
          handletype={"chapter"}
          key={uuidv4()}
          className="taskDuration"
          draggable="true"
          tabIndex="0"
          // onDragStart={() => handleDragStart(notebook.id)}
          style={{
            position: "relative",
            height: "calc(var(--cell-height) - 10px)",
            margin: "0px 5px",
            zIndex: "5",
            background: `linear-gradient(90deg, ${theme.palette.colorOption[chapterColor]?.gradient.gradientLeft} 10%, ${theme.palette.colorOption[chapterColor]?.gradient.gradientRight} 100%)`,
            borderRadius: "var(--border-radius)",
            boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
            cursor: "context-menu",
            alignSelf: "center",
            justifyItems: "center",
            // margin: "auto",
            width: `calc(${dayDiff(
              chapter.start,
              chapter.end
            )} * var(--width-Days) - 5px)`,
            opacity: taskDurationElDraggedId === notebook.id ? "0.5" : "1",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
          onContextMenu={(e) => handleContextMenu(e, "chapter", index)}
        >
          <div style={{ marginLeft: "10px", whiteSpace: "nowrap" }}>
            {chapter.name}
          </div>
        </div>
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
      <div
        key={uuidv4()}
        className="taskRow"
        style={{ display: `${isUnfold}` }}
      >
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

  const handleColorChange = (target, color, chapterIndex) => {
    const db = getDatabase();

    const uid = window.localStorage.getItem("uid");

    let postData = {};
    if (target === "chapter") {
      postData = {
        ...props.notebookData[notebookIndex].chapters[chapterIndex],
        color: color,
      };
    } else {
      postData = {
        ...props.notebookData[notebookIndex],
        color: color,
      };
    }

    let dataPath = "";
    if (target === "chapter") {
      dataPath = `/users/${uid}/notebooks/${notebookIndex}/chapters/${chapterIndex}`;
    } else {
      dataPath = `/users/${uid}/notebooks/${notebookIndex}`;
    }

    const updates = {};
    updates[dataPath] = postData;

    return update(ref(db), updates);
  };

  return (
    <Fragment>
      {taskRows}
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
            onClick={(e) => {
              handleColorChange(targetType, "white", chapterIndex);
              handleClose();
            }}
            sx={{
              gap: "5px",
              color: `${theme.palette.colorOption.white.solid}`,
            }}
          >
            <Brightness1Icon />
            <Typography sx={{ color: "#979797" }}>White</Typography>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleColorChange(targetType, "blue", chapterIndex);
              handleClose();
            }}
            sx={{
              gap: "5px",
              color: `${theme.palette.colorOption.blue.solid}`,
            }}
          >
            <Brightness1Icon />
            <Typography
              sx={{ color: `${theme.palette.colorOption.blue.solid}` }}
            >
              Blue
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleColorChange(targetType, "yellow", chapterIndex);
              handleClose();
            }}
            sx={{
              gap: "5px",
              color: `${theme.palette.colorOption.yellow.solid}`,
            }}
          >
            <Brightness1Icon />
            <Typography
              sx={{ color: `${theme.palette.colorOption.yellow.solid}` }}
            >
              Yellow
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleColorChange(targetType, "red", chapterIndex);
              handleClose();
            }}
            sx={{ gap: "5px", color: `${theme.palette.colorOption.red.solid}` }}
          >
            <Brightness1Icon />
            <Typography
              sx={{ color: `${theme.palette.colorOption.red.solid}` }}
            >
              Red
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleColorChange(targetType, "green", chapterIndex);
              handleClose();
            }}
            sx={{
              gap: "5px",
              color: `${theme.palette.colorOption.green.solid}`,
            }}
          >
            <Brightness1Icon />
            <Typography
              sx={{ color: `${theme.palette.colorOption.green.solid}` }}
            >
              Green
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </Fragment>
  );
}
