export interface ScreenState {
  screenWidth500: boolean;
  screenWidth767: boolean;
  isGanttMode: boolean;
  sidebarOpen: boolean;
  ganttUnfold: Record<string, boolean>;
}

interface ScreenWidth500Action {
  type: "screenListener/handleScreenWidth500";
  payload: boolean;
}

interface ScreenWidth767Action {
  type: "screenListener/handleScreenWidth767";
  payload: boolean;
}

interface ModeUpdateAction {
  type: "mode/handleModeUpdate";
  payload: boolean;
}

interface SidebarOpenAction {
  type: "sidebar/handleSidebarOpen";
  payload: boolean;
}

interface UpdatedGanttUnfoldListAction {
  type: "gantt/handleUpdatedGanttUnfoldList";
  payload: Record<string, boolean>;
}

interface GanttUnfoldAction {
  type: "gantt/handleGanttUnfold";
  payload: {
    index: number;
    boolean: boolean;
  };
}

type ScreenAction = 
  | ScreenWidth500Action 
  | ScreenWidth767Action 
  | ModeUpdateAction 
  | SidebarOpenAction 
  | UpdatedGanttUnfoldListAction 
  | GanttUnfoldAction;

const initialstate: ScreenState = {
  screenWidth500: false,
  screenWidth767: false,
  isGanttMode: true,
  sidebarOpen: true,
  ganttUnfold: {},
};

const viewListener = (state = initialstate, action: ScreenAction): ScreenState => {
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
        isGanttMode: action.payload,
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
