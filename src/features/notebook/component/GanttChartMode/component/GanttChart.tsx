import { Fragment } from 'react'
import * as React from 'react'
import Grid from './Grid'
import GanttChartList from './GanttChartList'
import GanttNotebookList from './GanttNotebookList'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { Theme } from '@mui/material/styles'

interface TimeRange {
  fromSelectMonth: number
  fromSelectYear: string
  toSelectMonth: number
  toSelectYear: string
}

interface GanttChartProps {
  notebookData: any
  timeRange: TimeRange
  theme: Theme
}

interface RootState {
  viewListener: {
    screenWidth767: boolean
  }
}

export default function GanttChart(props: GanttChartProps) {
  const { notebookData, timeRange, theme } = props

  const screenSmall767 = useSelector((state: RootState) => state.viewListener.screenWidth767)

  return (
    <Fragment>
      <Grid theme={theme}>
        <GanttNotebookList theme={theme} key={uuidv4()} notebookData={notebookData} isSmallScreen={screenSmall767} />
        <GanttChartList
          theme={theme}
          key={uuidv4()}
          timeRange={timeRange}
          isSmallScreen={screenSmall767}
          notebookData={notebookData}
        />
      </Grid>
    </Fragment>
  )
}
