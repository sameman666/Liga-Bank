import {ActionType} from "./action";

const initialState = {
  rates: null,
  isRatesLoaded: false,
  isError: false
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.WRITE_DATA:
      return {
        rates: action.payload,
        isRatesLoaded: true,
        isError: false
      };
    case ActionType.SET_SERVER_ERROR:
      return {
        ...state,
        isError: true
      };
    default: return state;
  }
};
