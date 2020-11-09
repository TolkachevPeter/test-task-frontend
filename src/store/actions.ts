export interface UpdateActionType {
  type: string;
  value?: any;
  [key: string]: any;
};

export interface ActionCreatorType {
  (value: any): UpdateActionType;
};

export function createUpdateAction(UPDATE: string, key: string = 'value'): ActionCreatorType {
  return (value: any) => ({ type: UPDATE, [key]: value });
}

export interface UpdateReducerType {
  (state: any, action: UpdateActionType): any;
};

export function createUpdateReducer(UPDATE: string, getInitialState: Function): UpdateReducerType {
  return (state = getInitialState(), action: { type: string, value: any }) => {
    const { type, value } = action;

    switch (type) {
    case UPDATE:
      if (typeof value === 'undefined') {
        return getInitialState();
      }

      return {...state, ...value};
    default:
      return state;
    }
  };
}

export function createObjectReducer(UPDATE, getInitialState = () => ({})) {
  return (state = getInitialState(), action) => {
    const { type, value } = action;

    switch (type) {
    case UPDATE:
      if (typeof value === 'undefined') {
        return getInitialState();
      }
      return {
        ...state,
        ...value,
      };
    default:
      return state;
    }
  };
}
