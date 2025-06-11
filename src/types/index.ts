// Common component prop types
export interface BaseComponentProps {
  theme?: import('@mui/material/styles').Theme
  isSmallScreenW500?: boolean
  isSmallScreenW767?: boolean
}

// Re-export types from store for easier imports
export type { RootState, AppDispatch } from '../store/store'
export type { Notebook, Chapter, NotebookState } from '../store/notebookSlice'
export type { ScreenState } from '../store/screenSlice'

// Common event handler types
export type MouseEventHandler = (event: React.MouseEvent<HTMLElement>) => void
export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void
export type FormEventHandler = (event: React.FormEvent<HTMLFormElement>) => void
