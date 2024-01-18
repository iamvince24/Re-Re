// All data
export const fetchNotebookData = (data) => {
  return {
    type: "notebookData/fetchNotebookData",
    payload: data,
  };
};

//Focus Notebook & Chapter Index
export const handleUpdateIndex = (notebookIndex, chapterIndex) => {
  return {
    type: "notebookData/handleUpdateIndex",
    payload: {
      notebookIndex: notebookIndex,
      chapterIndex: chapterIndex,
    },
  };
};

// Screen
export const handleScreenWidth500 = (boolean) => {
  return {
    type: "screenListener/handleScreenWidth500",
    payload: boolean,
  };
};

export const handleScreenWidth767 = (boolean) => {
  return {
    type: "screenListener/handleScreenWidth767",
    payload: boolean,
  };
};

//Mode
export const handleModeUpdate = (boolean) => {
  return {
    type: "mode/handleModeUpdate",
    payload: boolean,
  };
};

//Sidebar
export const handleSidebarOpen = (boolean) => {
  return {
    type: "sidebar/handleSidebarOpen",
    payload: boolean,
  };
};

// GanttUnfold
export const handleUpdatedGanttUnfoldList = (object) => {
  return {
    type: "gantt/handleGanttUnfold",
    payload: object,
  };
};

export const handleGanttUnfold = (index, boolean) => {
  return {
    type: "gantt/handleGanttUnfold",
    payload: {
      index: index,
      boolean: boolean,
    },
  };
};
