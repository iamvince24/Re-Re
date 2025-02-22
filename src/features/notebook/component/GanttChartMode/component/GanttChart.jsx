import { Fragment } from "react";
import * as React from "react";
import Grid from "./Grid";
import GanttChartList from "./GanttChartList";
import GanttNotebookList from "./GanttNotebookList";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

export default function GanttChart(props) {
  const { notebookData, timeRange, theme } = props;

  const screenSmall767 = useSelector(
    (state) => state.viewListener.screenWidth767
  );

  return (
    <Fragment>
      <Grid>
        <GanttNotebookList
          theme={theme}
          key={uuidv4()}
          notebookData={notebookData}
          isSmallScreen={screenSmall767}
        />
        <GanttChartList
          theme={theme}
          key={uuidv4()}
          timeRange={timeRange}
          isSmallScreen={screenSmall767}
          notebookData={notebookData}
        />
      </Grid>
    </Fragment>
  );
}
