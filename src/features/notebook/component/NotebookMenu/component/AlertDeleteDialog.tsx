import * as React from 'react'
import { Fragment, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ThemeProvider, Theme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import { useSelector } from 'react-redux'

import { getDatabase, update, ref } from 'firebase/database'

interface AlertDeleteDialogProps {
  notebookIndex?: number
  chapterIndex?: number
  notebookId?: string
  chapterId?: string
  theme: Theme
  deleteMessage: string
  handleCloseBtn: (event: React.MouseEvent) => void
}

interface RootState {
  notebookData: {
    notebooks: Array<{
      id: string
      chapters?: Array<{
        id: string
        [key: string]: any
      }>
      [key: string]: any
    }>
  }
}

export default function AlertDeleteDialog(props: AlertDeleteDialogProps) {
  const { notebookIndex, chapterIndex, notebookId, chapterId } = props
  const allNotebookData = useSelector((state: RootState) => state.notebookData.notebooks)

  const [open, setOpen] = useState(false)

  const handleClickOpen = (event: React.MouseEvent) => {
    event.stopPropagation()
    setOpen(true)
  }

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation()
    setOpen(false)
    props.handleCloseBtn(event)
  }

  const uid = window.localStorage.getItem('uid')

  const handleDelete = async () => {
    const db = getDatabase()

    let postData: any = {}
    if (chapterIndex !== undefined && notebookIndex !== undefined) {
      postData = allNotebookData[notebookIndex]?.chapters?.filter(chapter => chapter.id !== chapterId) || []
    } else {
      postData = allNotebookData.filter(notebook => notebook.id !== notebookId)
    }

    let dataPath = ''
    if (chapterIndex !== undefined) {
      dataPath = `/users/${uid}/notebooks/${notebookIndex}/chapters`
    } else {
      dataPath = `/users/${uid}/notebooks`
    }
    const updates: { [key: string]: any } = {}
    updates[dataPath] = postData
    return update(ref(db), updates)
  }

  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        <MenuItem onClick={handleClickOpen}>Delete</MenuItem>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Delete ${props.deleteMessage}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              After deleting the notebook, it will never be restored. Please confirm to delete the notebook.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="secondary" onClick={handleDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Fragment>
  )
}
