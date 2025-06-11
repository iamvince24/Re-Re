export interface Chapter {
  id: string | number
  name: string
  start: string
  end: string
  content: string
  color: string
}

export interface Notebook {
  id: number
  name: string
  start: string
  end: string
  color: string
  chapters: Chapter[]
}

export interface NotebookState {
  notebooks: Notebook[]
  username: string
  focusNotebookAndChapterIndex: {
    notebookIndex: number
    chapterIndex: number
  }
}

interface FetchNotebookDataAction {
  type: 'notebookData/fetchNotebookData'
  payload: Notebook[]
}

interface UpdateIndexAction {
  type: 'notebookData/handleUpdateIndex'
  payload: {
    notebookIndex: number
    chapterIndex: number
  }
}

interface UpdateUsernameAction {
  type: 'username/updatedUsername'
  payload: string
}

type NotebookAction = FetchNotebookDataAction | UpdateIndexAction | UpdateUsernameAction

const initialstate: NotebookState = {
  notebooks: [
    {
      id: 12312,
      name: 'Loading',
      start: '2024-01-01',
      end: '2024-01-02',
      color: 'white',
      chapters: [
        {
          id: '15433',
          name: 'Loading',
          start: '2024-01-01',
          end: '2024-01-02',
          content: '',
          color: 'white',
        },
      ],
    },
  ],
  username: 'User',
  focusNotebookAndChapterIndex: {
    notebookIndex: 0,
    chapterIndex: 0,
  },
}

const notebookData = (state = initialstate, action: NotebookAction): NotebookState => {
  switch (action.type) {
    case 'notebookData/fetchNotebookData':
      return {
        ...state,
        notebooks: action.payload,
      }

    case 'notebookData/handleUpdateIndex':
      return {
        ...state,
        focusNotebookAndChapterIndex: {
          ...state.focusNotebookAndChapterIndex,
          notebookIndex: action.payload.notebookIndex,
          chapterIndex: action.payload.chapterIndex,
        },
      }

    case 'username/updatedUsername':
      return {
        ...state,
        username: action.payload,
      }

    default:
      return state
  }
}

export default notebookData
