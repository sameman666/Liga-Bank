import {FETCH_URL} from '../utils/const';
import dayjs from "dayjs";

export const ActionType = {
  CREATE_STORIES: `STORIES/CREATE_STORIES`,
  CLEAR_STORIES: `STORIES/CLEAR_STORIES`,
  HANDLE_USER_HAS: `USER/HANDLE_USER_HAS`,
  HANDLE_USER_WANT: `USER/HANDLE_USER_WANT`,
  HANDLE_USER_HAS_CURRENCY: `USER/HANDLE_USER_HAS_CURRENCY`,
  HANDLE_USER_WANT_CURRENCY: `USER/HANDLE_USER_WANT_CURRENCY`,
  HANDLE_DATE: `USER/HANDLE_DATE`,
  WRITE_DATA: `SERVER/WRITE_DATA`,
  SET_SERVER_ERROR: `SERVER/SET_SERVER_ERROR`
};


export const createStories = (story) => {
  return {
    type: ActionType.CREATE_STORIES,
    payload: story
  };
};

export const clearStories = () => {
  return {
    type: ActionType.CLEAR_STORIES,
    payload: []
  };
};

export const handleUserHas = (userHas) => {
  return {
    type: ActionType.HANDLE_USER_HAS,
    payload: userHas
  };
};

export const handleUserWant = (userWant) => {
  return {
    type: ActionType.HANDLE_USER_WANT,
    payload: userWant
  };
};


export const handleUserHasCurrency = (userHasCurrency) => {
  return {
    type: ActionType.HANDLE_USER_HAS_CURRENCY,
    payload: userHasCurrency
  };
};

export const handleUserWantCurrency = (userWantCurrency) => {
  return {
    type: ActionType.HANDLE_USER_WANT_CURRENCY,
    payload: userWantCurrency
  };
};

export const handleDate = (date) => {
  return {
    type: ActionType.HANDLE_DATE,
    payload: date
  };
};

export const writeData = (data) => {
  return {
    type: ActionType.WRITE_DATA,
    payload: data
  };
};

export const setServerError = () => {
  return {
    type: ActionType.SET_SERVER_ERROR,
  };
};

export const loadRates = (date) => (dispatch, getState) => {
  let urlToFetch;
  if (dayjs(date).format(`YYYY//MM//DD`) === getState().userData.date.format(`YYYY//MM//DD`)) {
    urlToFetch = FETCH_URL;
  } else {
    const currentDate = dayjs(date).format(`YYYY//MM//DD`);
    urlToFetch = `https://www.cbr-xml-daily.ru//archive//${currentDate}//daily_json.js`;
  }
  fetch(urlToFetch)
      .then((response) => response.json())
      .then((response) => {
        dispatch(handleDate(dayjs(date)));
        dispatch(writeData(response));
      })
      .catch(() => {
        dispatch(setServerError());
      });
};
