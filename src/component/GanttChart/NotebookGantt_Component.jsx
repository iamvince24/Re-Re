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
import { getDatabase, ref, set, child, push, update } from "firebase/database";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";

export default function NotebookGanttComponent(props) {
  const {
    theme,
    id,
    index,
    notebookData,
    notebook,
    timeRange,
    startMonth,
    numMonths,
    taskDurations,
    setTaskDurations,
    ganttTimePeriod,
    ganttTimePeriodCell,
    // ganttUnfoldList,
  } = props;

  const isUnfold = useSelector((state) =>
    state.viewListener.ganttUnfold[index] ? "block" : "none"
  );

  const startDate = `${timeRange.fromSelectYear}-${
    months[timeRange.fromSelectMonth]
  }-01`;
  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [targetType, setTargetType] = useState(null);

  let earliestDate = new Date("2024-01-01");
  let latestDate = new Date("2024-01-02");

  // 遍歷資料
  notebook.chapters?.forEach((chapter) => {
    const startDate = new Date(chapter.start);
    const endDate = new Date(chapter.end);

    // 檢查最早的日期
    if (startDate < earliestDate) {
      earliestDate = startDate;
    }

    // 檢查最晚的日期
    if (endDate > latestDate) {
      latestDate = endDate;
    }
  });

  const dateFormat = "YYYY-MM-DD";
  const [notebookStart, notebookEnd] = [
    dayjs(earliestDate).format(dateFormat),
    dayjs(latestDate).format(dateFormat),
  ];

  function handleDragStart(taskDurationId) {
    setTaskDurationElDraggedId(taskDurationId);
  }

  const handleContextMenu = (event, target) => {
    event.preventDefault();
    setTargetType(target);
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
          zIndex: "5",
          // background:
          //   "linear-gradient(90deg, var(--color-taskDuration-left) 30%, var(--color-taskDuration-right) 100%)",
          background: `linear-gradient(90deg, ${theme.palette.colorOption[noteBookColor]?.gradient.gradientLeft} 10%, ${theme.palette.colorOption[noteBookColor]?.gradient.gradientRight} 100%)`,
          borderRadius: "var(--border-radius)",
          boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
          cursor: "move",
          alignSelf: "center",
          justifyItems: "center",
          width: `calc(${dayDiff(
            // notebook.start,
            // notebook.end
            notebookStart,
            notebookEnd
          )} * var(--width-Days))`,
          opacity: taskDurationElDraggedId === notebook.id ? "0.5" : "1",
        }}
        onKeyDown={(e) => deleteTaskDuration(e, notebook.id)}
        onContextMenu={(e) => handleContextMenu(e, "notebook")}
      ></div>
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

  notebook.chapters?.map((chapter) => {
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
          handletype={"chapter"}
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
            // background:
            //   "linear-gradient(90deg, var(--color-taskDuration-left) 10%, var(--color-taskDuration-right) 100%)",
            background: `linear-gradient(90deg, ${theme.palette.colorOption[chapterColor]?.gradient.gradientLeft} 10%, ${theme.palette.colorOption[chapterColor]?.gradient.gradientRight} 100%)`,
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
          onContextMenu={(e) => handleContextMenu(e, "chapter")}
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

  const handleColorChange = (target, color) => {
    const db = getDatabase();

    const uid = window.localStorage.getItem("uid");
    let notebookIdForFunc = 0;
    let chapterIdForFunc = 0;

    for (var i = 0; i < props.notebookData.length; i++) {
      if (props.notebookData[i]?.id === props.id) {
        notebookIdForFunc = i;
        if (props.chapterId !== undefined) {
          for (var j = 0; j < props.notebookData[i].chapters.length; j++) {
            if (
              props.notebookData[notebookIdForFunc].chapters[j]?.id ===
              props.chapterId
            ) {
              chapterIdForFunc = j;
              break;
            }
          }
        } else {
          break;
        }
      }
    }

    // A post entry.
    let postData = {};
    if (target === "chapter") {
      postData = {
        ...props.notebookData[notebookIdForFunc].chapters[chapterIdForFunc],
        color: color,
      };
    } else {
      postData = {
        ...props.notebookData[notebookIdForFunc],
        color: color,
      };
    }

    let dataPath = "";
    if (target === "chapter") {
      dataPath = `/users/${uid}/notebooks/${notebookIdForFunc}/chapters/${chapterIdForFunc}`;
    } else {
      dataPath = `/users/${uid}/notebooks/${notebookIdForFunc}`;
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
              handleColorChange(targetType, "white");
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
              handleColorChange(targetType, "blue");
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
              handleColorChange(targetType, "yellow");
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
              handleColorChange(targetType, "red");
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
              handleColorChange(targetType, "green");
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
