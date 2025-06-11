import { Fragment } from 'react'
import * as React from 'react'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { useSelector, useDispatch } from 'react-redux'
import { handleGanttUnfold } from '../../../../../store/action'

interface Chapter {
  id: string
  name: string
  start: string
  end: string
  color: string
}

interface Notebook {
  id: string
  name: string
  chapters?: Chapter[]
}

interface GanttNotebookListComponentProps {
  theme: any
  notebook: Notebook
  index: number
}

interface RootState {
  viewListener: {
    ganttUnfold: { [key: number]: boolean }
  }
}

export default function GanttNotebookListComponent(props: GanttNotebookListComponentProps) {
  const { theme, notebook, index } = props
  const dispatch = useDispatch()

  const isUnfold = useSelector((state: RootState) => state.viewListener.ganttUnfold[index])

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(handleGanttUnfold(index, !isUnfold))
  }

  return (
    <Fragment>
      <List
        sx={{
          width: '100%',
          color: `${theme.palette.primary.main}`,
          py: 0,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            height: '40px',
            display: 'flex',
            alignContent: 'center',
            color: `${theme.palette.primary.main}`,
            px: 1,
            '&:hover': {
              backgroundColor: 'rgba(155, 155, 155, 0.2)',
            },
          }}
        >
          {isUnfold ? <ExpandLess /> : <ExpandMore />}
          <ImportContactsIcon sx={{ color: `${theme.palette.primary.main}`, mx: '10px' }}>
            <InboxIcon />
          </ImportContactsIcon>
          <ListItemText
            primary={notebook?.name}
            primaryTypographyProps={{
              fontWeight: 700,
              color: `${theme.palette.primary.main}`,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          />
        </ListItemButton>
        {notebook?.chapters
          ? notebook?.chapters.map((chapter: Chapter, chapterIndex: number) => {
              return (
                <Collapse
                  in={isUnfold}
                  timeout="auto"
                  unmountOnExit
                  key={`${chapter.id}-${chapterIndex}`}
                  sx={{ height: '40px', padding: 0 }}
                >
                  <List component="div" disablePadding sx={{ height: '40px' }}>
                    <ListItemButton
                      disableRipple={true}
                      sx={{
                        pl: 5,
                        py: 0,
                        height: '40px',
                        color: `${theme.palette.primary.main}`,
                        '&:hover': {
                          backgroundColor: 'rgba(155, 155, 155, 0.2)',
                        },
                      }}
                    >
                      <ArticleOutlinedIcon
                        sx={{
                          color: `${theme.palette.primary.main}`,
                          marginRight: '10px',
                        }}
                      >
                        <StarBorder />
                      </ArticleOutlinedIcon>
                      <ListItemText
                        primary={chapter.name}
                        primaryTypographyProps={{
                          pt: '1px',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              )
            })
          : null}
      </List>
    </Fragment>
  )
}
