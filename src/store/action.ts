import { Notebook } from './notebookSlice';

// All data
export const fetchNotebookData = (data: Notebook[]) => {
  return {
    type: "notebookData/fetchNotebookData",
    payload: data,
  } as const;
};

// All data
export const updatedUsername = (name: string) => {
  return {
    type: "username/updatedUsername",
    payload: name,
  } as const;
};

//Focus Notebook & Chapter Index
export const handleUpdateIndex = (notebookIndex: number, chapterIndex: number) => {
  return {
    type: "notebookData/handleUpdateIndex",
    payload: {
      notebookIndex: notebookIndex,
      chapterIndex: chapterIndex,
    },
  } as const;
};

// Screen
export const handleScreenWidth500 = (boolean: boolean) => {
  return {
    type: "screenListener/handleScreenWidth500",
    payload: boolean,
  } as const;
};

export const handleScreenWidth767 = (boolean: boolean) => {
  return {
    type: "screenListener/handleScreenWidth767",
    payload: boolean,
  } as const;
};

//Mode
export const handleModeUpdate = (boolean: boolean) => {
  return {
    type: "mode/handleModeUpdate",
    payload: boolean,
  } as const;
};

//Sidebar
export const handleSidebarOpen = (boolean: boolean) => {
  return {
    type: "sidebar/handleSidebarOpen",
    payload: boolean,
  } as const;
};

// GanttUnfold
export const handleUpdatedGanttUnfoldList = (list: Record<string, boolean>) => {
  return {
    type: "gantt/handleUpdatedGanttUnfoldList",
    payload: list,
  } as const;
};

export const handleGanttUnfold = (index: number, boolean: boolean) => {
  return {
    type: "gantt/handleGanttUnfold",
    payload: {
      index: index,
      boolean: boolean,
    },
  } as const;
};
