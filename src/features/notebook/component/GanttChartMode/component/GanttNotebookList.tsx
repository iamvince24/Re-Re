import * as React from 'react'
import { Fragment } from 'react'
import { useEffect, useRef } from 'react'
import GanttNotebookListComponent from './GanttNotebookListComponent'
import { useSelector } from 'react-redux'

interface GanttNotebookListProps {
  theme: any
  notebookData: any
  isSmallScreen: boolean
}

interface RootState {
  notebookData: {
    notebooks: any[]
  }
}

export default function GanttNotebookList({ theme }: GanttNotebookListProps) {
  const allNotebookData = useSelector((state: RootState) => state.notebookData.notebooks)

  const inputRef = useRef<HTMLInputElement[]>([])
  const indexRef = useRef<number | null>(null)

  useEffect(() => {
    if (inputRef.current.length && indexRef.current !== null && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus()
    }
  })

  return (
    <Fragment>
      <div id="gantt-grid-container__tasks">
        <div className="gantt-task-row-empty"></div>
        <div className="gantt-task-row-empty"></div>
        {allNotebookData &&
          allNotebookData?.map((notebook, index) => (
            <GanttNotebookListComponent
              theme={theme}
              notebook={notebook}
              index={index}
              key={`${notebook.id}-${index}`}
            />
          ))}
      </div>
      <style>
        {`
          #gantt-grid-container__tasks {
            border-right: 1px solid var(--color-Tasks-Border-Bottom);
            overflow: "hidden",
          }

          .gantt-task-row-empty {
            display: flex;
            text-align: center;
            height: var(--cell-height);
            // border-bottom: 1px solid var(--color-Tasks-Border-Bottom);
            border-bottom: 1px solid ${theme.palette.primary.main};
       
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
  )
}
