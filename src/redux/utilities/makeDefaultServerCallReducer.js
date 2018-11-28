// @flow
type Options = {
  loadingActions?: string[];
  errorActions?: string[];
  successActions?: string[];
  resetActions?: string[];
  otherActions?: { name: string, callback: Function }[];
  initialState: any;
}

const makeDefaultServerCallReducer = (options: Options) => {
  const { initialState, loadingActions, errorActions, successActions, resetActions, otherActions } = options;

  return (state: any = initialState, action: { type: string, payload: any }) => {
    if (loadingActions && loadingActions.indexOf(action.type) !== -1) {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    } else if (successActions && successActions.indexOf(action.type) !== -1) {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    } else if (errorActions && errorActions.indexOf(action.type) !== -1) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: null,
      };
    } else if (resetActions && resetActions.indexOf(action.type) !== -1) {
      return { ...initialState };
    } else if (otherActions && otherActions.find(otherAction => otherAction.name === action.type)) {
      const actionHandler: any = otherActions.find(otherAction => otherAction.name === action.type);
      return actionHandler.callback(state, action);
    } else {
      return state;
    }
  };
};

export default makeDefaultServerCallReducer;
