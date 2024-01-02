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

export default function GanttChart(props) {
  const { notebookData, notebookDisplay } = props;
  const [tasks, setTasks] = useState(null);
  const [taskDurations, setTaskDurations] = useState(null);
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: "2022",
    toSelectMonth: 5,
    toSelectYear: "2022",
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
        <AddTask tasks={tasks} setTasks={setTasks} />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ margin: "0px 15px" }}
        />
        <AddTaskDuration tasks={tasks} setTaskDurations={setTaskDurations} />
        <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      </Settings>

      <Grid>
        <TasksTest
          tasks={tasks}
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}
          notebookData={props.notebookData}
          notebookDisplay={props.notebookDisplay}
        />
        <GanttChartTest
          timeRange={timeRange}
          tasks={tasks}
          setTasks={setTasks}
          taskDurations={taskDurations}
          setTaskDurations={setTaskDurations}
          notebookData={notebookData}
        />
      </Grid>
    </Fragment>
  );
}
