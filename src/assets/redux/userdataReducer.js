import {ActionType} from "./action";
import {Currency} from '../utils/const';
import dayjs from "dayjs";

const initialState = {
  userHas: ``,
  userWant: ``,
  userHasCurrency: Currency.RUB,
  userWantCurrency: Currency.USD,
  date: dayjs()
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.HANDLE_USER_HAS:
      return {
        ...state,
        userHas: action.payload
      };
    case ActionType.HANDLE_USER_WANT:
      return {
        ...state,
        userWant: action.payload
      };
    case ActionType.HANDLE_USER_HAS_CURRENCY:
      return {
        ...state,
        userHasCurrency: action.payload
      };
    case ActionType.HANDLE_USER_WANT_CURRENCY:
      return {
        ...state,
        userWantCurrency: action.payload
      };
    case ActionType.HANDLE_DATE:
      return {
        ...state,
        date: action.payload
      };
    default: return state;
  }
};
