import { useState, Fragment } from 'react'

import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  createFormattedDateFromDate,
  dayDiff,
} from '../../../../../utils/dateFunctions'
import { months } from '../../../../../utils/constants'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/joy/Typography'
import Brightness1Icon from '@mui/icons-material/Brightness1'
import { TimeRange } from '../types'

interface Task {
  id: number
}

interface TaskDuration {
  id: string
  task: number
  start: string
  end: string
}

interface TimeTableProps {
  timeRange: TimeRange
  tasks: Task[]
  taskDurations: TaskDuration[]
  setTaskDurations: React.Dispatch<React.SetStateAction<TaskDuration[]>>
}

export default function TimeTable({ timeRange, tasks, taskDurations, setTaskDurations }: TimeTableProps) {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
    taskId: number
    formattedDate: string
  } | null>(null)
  const handleContextMenu = (event: React.MouseEvent, taskId: number, formattedDate: string) => {
    event.preventDefault()
    const mouseX = event.clientX + 2
    const mouseY = event.clientY - 6
    setContextMenu({
      mouseX,
      mouseY,
      taskId,
      formattedDate,
    })
  }
  const handleClose = () => {
    setContextMenu(null)
  }

  // for dynamic css styling
  const ganttTimePeriod = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(var(--width-Days), 1fr)',
    textAlign: 'center' as const,
    height: 'var(--cell-height)',
  }

  const ganttTimePeriodSpan = {
    margin: 'auto',
  }

  const ganttTimePeriodCell = {
    position: 'relative' as const,
    padding: '0.5px 0px',
    display: 'flex',
  }

  const taskDuration = {
    position: 'absolute' as const,
    height: 'calc(var(--cell-height) - 10px)',
    zIndex: '5',
    background: 'linear-gradient(90deg, var(--color-taskDuration-left) 10%, var(--color-taskDuration-right) 100%)',
    borderRadius: 'var(--border-radius)',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.05)',
    cursor: 'move',
    alignSelf: 'center',
    justifyItems: 'center',
  }

  // creating rows
  const startMonth = new Date(parseInt(timeRange.fromSelectYear), timeRange.fromSelectMonth)
  const endMonth = new Date(parseInt(timeRange.toSelectYear), timeRange.toSelectMonth)
  const numMonths = monthDiff(startMonth, endMonth) + 1
  let month = new Date(startMonth)

  let monthRows: React.ReactElement[] = []
  let dayRows: React.ReactElement[] = []
  let dayRow: React.ReactElement[] = []
  let taskRows: React.ReactElement[] = []
  let taskRow: React.ReactElement[] = []

  for (let i = 0; i < numMonths; i++) {
    // create month rows
    monthRows.push(
      <div
        key={i}
        style={{
          ...ganttTimePeriod,
          outline: 'none',
          borderBottom: '1px solid var(--color-TimeTable-Border)',
          borderRight: '1px solid var(--color-TimeTable-Border)',
        }}
      >
        <span
          style={{
            ...ganttTimePeriodSpan,
            color: 'var(--primary-color)',
            fontWeight: 500,
          }}
        >
          {months[month.getMonth()] + ' ' + month.getFullYear()}
        </span>
      </div>,
    )
    // create day and week rows
    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1)
    const currYear = month.getFullYear()
    const currMonth = month.getMonth() + 1
    for (let j = 1; j <= numDays; j++) {
      const currentDate = new Date(currYear, currMonth - 1, j)
      const dayOfWeek = currentDate.getDay()

      dayRow.push(
        <div
          key={j}
          style={{
            ...ganttTimePeriod,
            outline: 'none',
            borderBottom: '1px solid var(--color-TimeTable-Border)',
            backgroundColor: dayOfWeek === 0 || dayOfWeek === 6 ? 'var(--color-Holiday)' : 'none',
          }}
        >
          <span style={ganttTimePeriodSpan}>{j}</span>
        </div>,
      )
    }
    dayRows.push(
      <div
        key={i}
        style={{
          ...ganttTimePeriod,
          outline: 'none',
          color: 'var(  --primary-color)',
        }}
      >
        {dayRow}
      </div>,
    )
    dayRow = []
    month.setMonth(month.getMonth() + 1)
  }

  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState<string | null>(null)
  function handleDragStart(taskDurationId: string) {
    setTaskDurationElDraggedId(taskDurationId)
  }

  // create task rows
  if (tasks) {
    tasks.forEach(task => {
      let mnth = new Date(startMonth)
      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear()
        const curMonth = mnth.getMonth() + 1
        const numDays = getDaysInMonth(curYear, curMonth)
        for (let j = 1; j <= numDays; j++) {
          // color weekend cells differently
          const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1)
          // add task and date data attributes
          const formattedDate = createFormattedDateFromStr(curYear, curMonth, j)
          taskRow.push(
            <div
              key={`${task.id}-${j}`}
              style={{
                ...ganttTimePeriodCell,
                borderRight: '0.5px solid var(--color-TimeTable-TaskRow-BorderRight)',
                backgroundColor: dayOfTheWeek === 'S' ? 'var(--color-Holiday)' : 'none',
              }}
              data-task={task.id}
              data-date={formattedDate}
              onDrop={onTaskDurationDrop}
            >
              {taskDurations.map((el, i) => {
                if (el.task === task.id && el.start === formattedDate) {
                  return (
                    <div
                      className="taskDuration"
                      key={`${i}-${el.id}`}
                      draggable="true"
                      tabIndex={0}
                      onDragStart={() => handleDragStart(el.id)}
                      style={{
                        ...taskDuration,
                        width: `calc(${dayDiff(el.start, el.end)} * 100% - 1px)`,
                        opacity: taskDurationElDraggedId === el.id ? '0.5' : '1',
                      }}
                      onKeyDown={e => deleteTaskDuration(e, el.id)}
                      onContextMenu={e => handleContextMenu(e, task.id, formattedDate)}
                    ></div>
                  )
                }
              })}
            </div>,
          )
        }
        taskRows.push(
          <div
            key={`${i}-${task.id}`}
            className="taskRow"
            style={{
              ...ganttTimePeriod,
            }}
          >
            {taskRow}
          </div>,
        )
        taskRow = []
        mnth.setMonth(mnth.getMonth() + 1)
      }
    })
  }

  function deleteTaskDuration(e: React.KeyboardEvent, id: string) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      // update taskDurations
      const newTaskDurations = taskDurations.filter(taskDuration => taskDuration.id !== id)
      // update state (if data on backend - make API request to update data)
      setTaskDurations(newTaskDurations)
    }
  }

  function onTaskDurationDrop(e: React.DragEvent) {
    const targetCell = e.target as HTMLElement
    // prevent adding on another taskDuration
    if (!targetCell.hasAttribute('draggable') && taskDurationElDraggedId) {
      // find task
      const taskDuration = taskDurations.filter(taskDuration => taskDuration.id === taskDurationElDraggedId)[0]
      const dataTask = targetCell.getAttribute('data-task')
      const dataDate = targetCell.getAttribute('data-date')

      if (taskDuration && dataTask && dataDate) {
        const daysDuration = dayDiff(taskDuration.start, taskDuration.end)
        // get new task values
        // get start, calc end using daysDuration - make Date objects - change taskDurations
        const newTask = parseInt(dataTask)
        const newStartDate = new Date(dataDate)
        let newEndDate = new Date(dataDate)
        newEndDate.setDate(newEndDate.getDate() + daysDuration - 1)
        // update taskDurations
        taskDuration.task = newTask
        taskDuration.start = createFormattedDateFromDate(newStartDate)
        taskDuration.end = createFormattedDateFromDate(newEndDate)
        const newTaskDurations = taskDurations.filter(taskDuration => taskDuration.id !== taskDurationElDraggedId)
        newTaskDurations.push(taskDuration)
        // update state (if data on backend - make API request to update data)
        setTaskDurations(newTaskDurations)
      }
    }
    setTaskDurationElDraggedId(null)
  }

  return (
    <Fragment>
      <div id="gantt-grid-container__time" style={{ gridTemplateColumns: `repeat(${numMonths}, 1fr)` }}>
        {monthRows}
        {dayRows}
        <div
          id="gantt-time-period-cell-container"
          style={{
            gridColumn: '1/-1',
            display: 'grid',
            gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          }}
          onDragOver={e => e.preventDefault()}
        >
          {taskRows}
        </div>
      </div>
      {contextMenu && (
        <Menu
          open={true}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: contextMenu.mouseY, left: contextMenu.mouseX }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <MenuItem onClick={handleClose} sx={{ gap: '5px', color: 'var(--primary-color)' }}>
            <Brightness1Icon />
            <Typography sx={{ color: 'var(--primary-color)' }}>Blue</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ gap: '5px', color: '#fbd07c' }}>
            <Brightness1Icon />
            <Typography sx={{ color: '#fbd07c' }}>Yellow</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ gap: '5px', color: '#43b692' }}>
            <Brightness1Icon />
            <Typography sx={{ color: '#43b692' }}>Green</Typography>
          </MenuItem>
        </Menu>
      )}
      <style>
        {`
        #gantt-grid-container__time {
          display: grid;
          overflow-x: auto;
        }

        .taskDuration:focus {
          outline: 2px solid white;
        }

        .dragging {
          opacity: 0.5;
        }

        .taskRow {
          position: relative;
          z-index: 1;
        }
        
        .taskRow:hover:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.3);
          z-index: 2;
        }
      `}
      </style>
    </Fragment>
  )
}
