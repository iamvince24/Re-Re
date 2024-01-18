const initialstate = {
  screenWidth500: false,
  screenWidth767: false,
  viewModeisNotebook: true,
  sidebarOpen: true,
  ganttUnfold: {
    // 1: false,
    // 2: false,
  },
};

const viewListener = (state = initialstate, action) => {
  switch (action.type) {
    case "screenListener/handleScreenWidth500":
      return {
        ...state,
        screenWidth500: action.payload,
      };

    case "screenListener/handleScreenWidth767":
      return {
        ...state,
        screenWidth767: action.payload,
      };

    case "mode/handleModeUpdate":
      return {
        ...state,
        viewModeisNotebook: action.payload,
      };

    case "sidebar/handleSidebarOpen":
      return {
        ...state,
        sidebarOpen: action.payload,
      };

    case "gantt/handleUpdatedGanttUnfoldList":
      return {
        ...state,
        ganttUnfold: action.payload,
      };

    case "gantt/handleGanttUnfold":
      const index = action.payload.index;
      return {
        ...state,
        ganttUnfold: {
          ...state.ganttUnfold,
          [`${index}`]: action.payload.boolean,
        },
      };

    default:
      return state;
  }
};

export default viewListener;
