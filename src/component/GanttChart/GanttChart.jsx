import { useState, useEffect } from "react";
import { Fragment } from "react";
import * as React from "react";
import { client } from "../../utils/fetchWrapper";

import AddTaskDuration from "./AddTaskDuration";
import AddTask from "./AddTask";
import Grid from "./Grid";
import Settings from "./Settings";
import Tasks from "./Tasks";
import TimeRange from "./TimeRange";
import TimeTable from "./TimeTable";
import Divider from "@mui/material/Divider";
import GanttChartTest from "./GanttChartTest";
import TasksTest from "./TasksTest";
import { v4 as uuidv4 } from "uuid";

export default function GanttChart(props) {
  const { notebookData, notebookDisplay, timeRange, setTimeRange } = props;
  const [tasks, setTasks] = useState(null);
  const [taskDurations, setTaskDurations] = useState(null);
  // const [timeRange, setTimeRange] = useState(props.timeRange);
  const [ganttUnfoldList, setGanttUnfoldList] = useState({
    list: [1, 2, 3],
  });

  useEffect(() => {
    client("data.json").then(
      (data) => {
        setTasks(data?.tasks);
        setTaskDurations(data?.taskDurations);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  return (
    <Fragment>
      <Settings>
        <AddTask key={uuidv4()} tasks={tasks} setTasks={setTasks} />
        <Divider
          key={uuidv4()}
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ margin: "0px 15px" }}
        />
        <AddTaskDuration
          key={uuidv4()}
          tasks={tasks}
          setTaskDurations={setTaskDurations}
        />
        <TimeRange
          key={uuidv4()}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      </Settings>

      <Grid isSmallScreen={props.isSmallScreen}>
        <TasksTest
          theme={props.theme}
          key={uuidv4()}
          tasks={tasks}
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}
          notebookData={props.notebookData}
          notebookDisplay={props.notebookDisplay}
          ganttUnfoldList={ganttUnfoldList}
          setGanttUnfoldList={setGanttUnfoldList}
          isSmallScreen={props.isSmallScreen}
        />
        <GanttChartTest
          theme={props.theme}
          key={uuidv4()}
          timeRange={timeRange}
          tasks={tasks}
          setTasks={setTasks}
          taskDurations={taskDurations}
          setTaskDurations={setTaskDurations}
          notebookData={notebookData}
          ganttUnfoldList={ganttUnfoldList}
          isSmallScreen={props.isSmallScreen}
        />
      </Grid>
    </Fragment>
  );
}
