import {ActionType} from "./action";

const initialState = {
  stories: []
};

export const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CREATE_STORIES:
      return {
        ...state,
        stories: [action.payload, ...state.stories]
      };
    case ActionType.CLEAR_STORIES:
      return {
        ...state,
        stories: action.payload
      };
    default: return state;
  }
};
