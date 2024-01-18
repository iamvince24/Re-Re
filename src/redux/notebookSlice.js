const initialstate = {
  notebooks: [
    {
      id: 12312,
      name: "Loading",
      start: "YYYY-MM-DD",
      end: "YYYY-MM-DD",
      color: "white",
      chapters: [
        {
          id: "15433",
          name: "Loading",
          start: "YYYY-MM-DD",
          end: "YYYY-MM-DD",
          content: "",
          color: "white",
        },
      ],
    },
  ],
  focusNotebookAndChapterIndex: {
    notebookIndex: 0,
    chapterIndex: 0,
  },
};

const notebookData = (state = initialstate, action) => {
  switch (action.type) {
    case "notebookData/fetchNotebookData":
      return {
        ...state,
        notebooks: action.payload,
      };

    case "notebookData/handleUpdateIndex":
      return {
        ...state,
        focusNotebookAndChapterIndex: {
          ...state.focusNotebookAndChapterIndex,
          notebookIndex: action.payload.notebookIndex,
          chapterIndex: action.payload.chapterIndex,
        },
      };

    default:
      return state;
  }
};

export default notebookData;
