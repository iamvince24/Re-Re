import * as React from 'react'
import { Fragment } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import styled from 'styled-components'
import { ThemeProvider, Theme } from '@mui/material/styles'

import { getDatabase, update, ref } from 'firebase/database'

const TextInput = styled('input')(() => ({
  height: '30px',
  marginTop: '10px',
  paddingLeft: '5px',
  borderTop: 'none',
  borderRight: 'none',
  borderLeft: 'none',
  color: 'var(--secondary-color)',
  width: '100%',
  letterSpacing: '1px',
  '&:focus': {
    outline: 'none',
  },
}))

interface FormDialogProps {
  notebookIndex: number
  chapterIndex?: number
  notebookData: Array<{
    name: string
    chapters?: Array<{
      name: string
      [key: string]: any
    }>
    [key: string]: any
  }>
  theme: Theme
  num?: number
  id?: string
  handleCloseBtn: (event: React.MouseEvent) => void
  handleClose: () => void
  onChange: (name: string, num: number) => void
}

export default function FormDialog(props: FormDialogProps) {
  const { notebookIndex, chapterIndex } = props

  let defaultName = ''
  if (chapterIndex !== undefined) {
    defaultName = props.notebookData[notebookIndex]?.chapters?.[chapterIndex]?.name || ''
  } else {
    defaultName = props.notebookData[notebookIndex]?.name || ''
  }

  const [open, setOpen] = React.useState(false)
  const [newName, setNewName] = React.useState(defaultName)

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const handleClickOpen = (event: React.MouseEvent) => {
    setOpen(true)
    event.stopPropagation()
  }

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation()
    setOpen(false)
    props.handleCloseBtn(event)
  }

  const handleConfirm = () => {
    setOpen(false)
    props.handleClose()
    if (props.num !== undefined) {
      props.onChange(newName, props.num)
    }
    setNewName('')
  }

  const handleRename = (name: string) => {
    const db = getDatabase()
    const uid = window.localStorage.getItem('uid')

    let postData: any = {}
    if (chapterIndex !== undefined) {
      postData = {
        ...props.notebookData[notebookIndex]?.chapters?.[chapterIndex],
        name: name,
      }
    } else {
      postData = {
        ...props.notebookData[notebookIndex],
        name: name,
      }
    }

    let dataPath = ''
    if (chapterIndex !== undefined) {
      dataPath = `/users/${uid}/notebooks/${notebookIndex}/chapters/${chapterIndex}`
    } else {
      dataPath = `/users/${uid}/notebooks/${notebookIndex}`
    }

    const updates: { [key: string]: any } = {}
    updates[dataPath] = postData

    return update(ref(db), updates)
  }

  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        <MenuItem onClick={handleClickOpen}>Rename</MenuItem>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Rename</DialogTitle>
          <DialogContent sx={{ width: '500px' }}>
            <DialogContentText>Please fill in the name you want to rename.</DialogContentText>

            <TextInput
              placeholder="New Notebook Name"
              value={newName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
              onClick={handleClick}
              autoFocus
            />
          </DialogContent>
          <DialogActions onClick={handleClose}>
            <Button color="secondary">Cancel</Button>
            {props.num ? (
              <Button
                color="secondary"
                onClick={() => {
                  handleConfirm()
                }}
              >
                Confirm
              </Button>
            ) : null}
            {props?.id ? (
              <Button
                color="secondary"
                onClick={() => {
                  handleRename(newName)
                }}
              >
                Confirm
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Fragment>
  )
}
