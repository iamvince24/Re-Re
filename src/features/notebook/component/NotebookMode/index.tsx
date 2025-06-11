import { Fragment, useState, useEffect } from 'react'
import * as React from 'react'
import { Box } from '@mui/system'
import Typography from '@mui/joy/Typography'
import Button from '@mui/material/Button'
import CustomSeparator from '../../../../component/common/CustomSeparator'
import DatePickerValue from './component/DatePickerValue'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import styled from 'styled-components'
import { ThemeProvider } from '@mui/material/styles'
import { getDatabase, update, ref } from 'firebase/database'
import { useSelector } from 'react-redux'
import { handleSidebarOpen } from '../../../../store/action'

// @ts-ignore - no type definitions available
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore - no type definitions available
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const toolBarHeight = 180

const TextEditor = styled.textarea.attrs(() => ({
  placeholder: 'Type something...',
}))`
  resize: none;
  all: unset;
  width: 100%;
  height: calc(100vh - ${toolBarHeight}px);
  text-align: left;
  color: #f4f4f3;
  overflow-y: scroll;
  letter-spacing: 0.5px;
  line-height: 22px;
`

const TextArea = styled('div')(() => ({
  resize: 'none',
  all: 'unset',
  width: '100%',
  height: `calc(100vh - ${toolBarHeight}px)`,
  textAlign: 'left',
  color: '#F4F4F3',
  letterSpacing: '0.5px',
  lineHeight: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'flex-start',
}))

interface NotebookModeProps {
  dispatch: any
  theme: any
}

interface RootState {
  notebookData: {
    notebooks: Array<{
      chapters?: Array<{
        content: string
        name: string
        [key: string]: any
      }>
    }>
    focusNotebookAndChapterIndex: {
      notebookIndex: number
      chapterIndex: number
    }
  }
  viewListener: {
    screenWidth767: boolean
    sidebarOpen: boolean
  }
}

export default function NotebookMode(props: NotebookModeProps) {
  const { dispatch, theme } = props

  const allNotebookData = useSelector((state: RootState) => state.notebookData.notebooks)
  const screenSmall767 = useSelector((state: RootState) => state.viewListener.screenWidth767)
  const isSidebarOpen = useSelector((state: RootState) => state.viewListener.sidebarOpen)

  const notebookIndex = useSelector((state: RootState) => state.notebookData.focusNotebookAndChapterIndex.notebookIndex)
  const chapterIndex = useSelector((state: RootState) => state.notebookData.focusNotebookAndChapterIndex.chapterIndex)

  const [toggleNotebookDisplay, setToggleNotebookDisplay] = useState(false)

  const [chapterName, setChapterName] = useState('')
  const [markdownText, setMarkdownText] = useState('')
  const [markdownTextTemp, setMarkdownTextTemp] = useState('')

  const uid = window.localStorage.getItem('uid')

  const handleDrawerOpen = () => {
    dispatch(handleSidebarOpen(true))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(e.target.value)
  }

  const handleUpdateNotebookContent = (e: React.MouseEvent, content: string) => {
    setToggleNotebookDisplay(false)

    const db = getDatabase()
    const currentChapter = allNotebookData[notebookIndex]?.chapters?.[chapterIndex]
    if (!currentChapter) return

    const postData = {
      ...currentChapter,
      content: content,
    }

    const dataPath = `/users/${uid}/notebooks/${notebookIndex}/chapters/${chapterIndex}`
    const updates: { [key: string]: any } = {}
    updates[dataPath] = postData

    return update(ref(db), updates)
  }

  const customCodeStyle = {
    backgroundColor: '#1F2937',
    borderRadius: '8px',
    padding: '12px',
    margin: '0',
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setToggleNotebookDisplay(false)
    }
  }

  useEffect(() => {
    let tempMarkdownText =
      allNotebookData[notebookIndex]?.chapters === undefined
        ? ''
        : allNotebookData[notebookIndex]?.chapters?.[chapterIndex]?.content || ''
    let tempChapterName =
      allNotebookData[notebookIndex]?.chapters === undefined
        ? ''
        : allNotebookData[notebookIndex]?.chapters?.[chapterIndex]?.name || ''

    setMarkdownTextTemp(tempMarkdownText)
    setMarkdownText(tempMarkdownText)
    setChapterName(tempChapterName)
  }, [allNotebookData, notebookIndex, chapterIndex])

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          className="bgTexture"
          sx={{
            height: '100vh',
            width: '100%',
          }}
        >
          <Box
            sx={{
              height: screenSmall767 ? 'auto' : '180px',
              padding: '0px 20px 20px',
              borderBottom: screenSmall767
                ? `1px solid ${theme.palette.dividerBorder.main}`
                : `1px solid ${theme.palette.dividerBorder.main}`,
            }}
          >
            <Box sx={{ height: '70px', display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  mr: 2,
                  ...(isSidebarOpen && { display: 'none' }),
                }}
              >
                <MenuIcon sx={{ color: `${theme.palette.primary.main}` }} />
              </IconButton>
              <CustomSeparator theme={theme} />
            </Box>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: '36px',
                color: `${theme.palette.primary.main}`,
                textTransform: 'capitalize',
                textAlign: 'left',
                marginTop: '-12.5px',
              }}
            >
              {chapterName}
            </Typography>
            <Box
              sx={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 'none',
                '@media (max-width:767px)': {
                  width: '100%',
                  gap: '20px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                },
              }}
            >
              <DatePickerValue theme={theme} />
              {toggleNotebookDisplay ? (
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      textTransform: 'capitalize',
                      color: `${theme.palette.secondary.main}`,
                      height: screenSmall767 ? '35px' : '42px',
                      padding: '0px 15px',
                      letterSpacing: '0.5px',
                      boxShadow: 'none',
                      fontWeight: 500,
                      marginRight: '15px',
                    }}
                    onClick={() => {
                      setToggleNotebookDisplay(false)
                      setMarkdownText(markdownTextTemp)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      textTransform: 'capitalize',
                      color: `${theme.palette.secondary.main}`,
                      height: screenSmall767 ? '35px' : '42px',
                      padding: '0px 15px',
                      letterSpacing: '0.5px',
                      boxShadow: 'none',
                      fontWeight: 500,
                    }}
                    onClick={e => handleUpdateNotebookContent(e, markdownText)}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    textTransform: 'capitalize',
                    color: `${theme.palette.secondary.main}`,
                    height: screenSmall767 ? '35px' : '42px',
                    padding: '0px 15px',
                    letterSpacing: '0.5px',
                    boxShadow: 'none',
                    fontWeight: 500,
                  }}
                  onClick={() => setToggleNotebookDisplay(true)}
                >
                  Editor
                </Button>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              padding: '20px',
              lineHeight: '30px',
              overflowY: 'scroll',
              height: `calc(100vh - ${toolBarHeight}px)`,
            }}
          >
            {toggleNotebookDisplay ? (
              <TextEditor
                value={markdownText}
                onChange={handleInputChange}
                className="textEditor"
                autoFocus
                onKeyDown={handleKeyDown}
              />
            ) : (
              <TextArea>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code: ({ node, className, children, ...props }: any) => {
                      const inline = props.inline
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          className="MarkdownStyle"
                          style={{ ...nightOwl, ...customCodeStyle }}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {markdownText}
                </ReactMarkdown>
              </TextArea>
            )}
          </Box>
        </Box>
      </ThemeProvider>
      <style>
        {`
        .MarkdownStyle {
          overflow: auto;
          border-radius: 5px;
        }
        `}
      </style>
    </Fragment>
  )
}
