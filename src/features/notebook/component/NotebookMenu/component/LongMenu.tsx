import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Fragment } from 'react'

import AlertDeleteDialog from './AlertDeleteDialog'
import AlertRenameDialog from './AlertRenameDialog'

import { getDatabase, ref, update } from 'firebase/database'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { debounce } from 'lodash'
import type { Notebook, Chapter } from '../../../../../types'

// const options = ["Rename", "Delete"];
function generateNumericId(): number {
  const fullId = uuidv4()
  const numericId = fullId.replace(/\D/g, '').substring(0, 5)
  return parseInt(numericId, 10)
}

const ITEM_HEIGHT = 48

function AddNewChapter(uid: string | null, notebookIndex: number, chaptersLength: number) {
  const db = getDatabase()

  const { formattedStartDate, formattedEndDate } = getFormattedDates()

  // A post entry.
  const postData = {
    id: generateNumericId(),
    name: 'Default Chapter',
    start: formattedStartDate,
    end: formattedEndDate,
    content: 'Type something',
    color: 'white',
  }

  // Get a key for a new Post.
  const newPostKey = chaptersLength
  const updates: { [key: string]: any } = {}
  updates['/users/' + uid + '/notebooks/' + notebookIndex + '/chapters/' + newPostKey] = postData

  return update(ref(db), updates)
}

function getFormattedDates() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()

  // Create a Date object for the current date
  const defaultStartDate = new Date(year, month - 1, day)

  // Create a Date object for the end date and add one day
  const defaultEndDate = new Date(year, month - 1, day)
  defaultEndDate.setDate(defaultEndDate.getDate() + 1)

  // Format dates as strings
  const formattedStartDate = formatDate(defaultStartDate)
  const formattedEndDate = formatDate(defaultEndDate)

  return { formattedStartDate, formattedEndDate }
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

interface LongMenuProps {
  notebookIndex?: number
  chapterIndex?: number
  notebookId?: string
  chapterId?: string
  theme: any
  addChapter?: boolean
  id?: any
  notebook?: Notebook
  notebookData?: Notebook[]
  deleteMessage?: string
}

interface RootState {
  notebookData: {
    notebooks: any[]
  }
}

export default function LongMenu(props: LongMenuProps) {
  const { notebookIndex, chapterIndex, notebookId, chapterId } = props
  const allNotebookData = useSelector((state: RootState) => state.notebookData.notebooks)
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = (event?: React.MouseEvent) => {
    setAnchorEl(null)
    event?.stopPropagation()
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleAddNewChapter = debounce(() => {
    if (notebookIndex === undefined || !props.notebookData || !props.notebook) return

    let notebookId = 0
    const uid = window.localStorage.getItem('uid')
    for (var i = 0; i < props.notebookData.length; i++) {
      if (props.notebookData[i]?.id === props.notebook.id) {
        notebookId = i
        break
      }
    }
    const chaptersLength = allNotebookData[notebookIndex]?.chapters?.length || 0
    AddNewChapter(uid, notebookIndex, chaptersLength)
  }, 500)

  return (
    <Fragment>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: `${props.theme.palette.primary.main}` }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '15ch',
          },
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {props.addChapter ? <MenuItem onClick={handleAddNewChapter}>Add Chapter</MenuItem> : null}
        <AlertRenameDialog
          theme={props.theme}
          handleClose={handleClose}
          handleCloseBtn={handleClose}
          notebookData={props.notebookData || []}
          notebookIndex={notebookIndex ?? 0}
          chapterIndex={chapterIndex}
          onChange={() => {}}
        />
        <AlertDeleteDialog
          theme={props.theme}
          handleCloseBtn={handleClose}
          notebookId={notebookId}
          chapterId={chapterId}
          deleteMessage={props.deleteMessage || ''}
          notebookIndex={notebookIndex}
          chapterIndex={chapterIndex}
        />
      </Menu>
    </Fragment>
  )
}
