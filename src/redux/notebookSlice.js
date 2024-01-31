const initialstate = {
  notebooks: [
    {
      id: 12312,
      name: "Loading",
      start: "2024-01-01",
      end: "2024-01-02",
      color: "white",
      chapters: [
        {
          id: "15433",
          name: "Loading",
          start: "2024-01-01",
          end: "2024-01-02",
          content: "",
          color: "white",
        },
      ],
    },
  ],
  username: "User",
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

    case "username/updatedUsername":
      return {
        ...state,
        username: action.payload,
      };

    default:
      return state;
  }
};

export default notebookData;
