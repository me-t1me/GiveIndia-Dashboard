import { ActionTypes } from "../constants/action-types";

export const storeData = (Data) => {
  return {
    type: ActionTypes.STORE_DATA,
    payload: Data,
  };
};

export const storeId = (Data) => {
  return {
    type: ActionTypes.STORE_ID,
    payload: Data,
  };
};

export const storeAllProg = (Data) => {
  return {
    type: ActionTypes.STORE_ALL_PROG,
    payload: Data,
  };
};

export const searchProgs = (Data) => {
  return {
    type: ActionTypes.SEARCH_PROGS,
    payload: Data,
  };
};
