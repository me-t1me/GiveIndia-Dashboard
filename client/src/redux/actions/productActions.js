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

export const searchProgsCause = (Data) => {
  return {
    type: ActionTypes.SEARCH_PROGS_CAUSE,
    payload: Data,
  };
};

export const searchProgsId = (Data) => {
  return {
    type: ActionTypes.SEARCH_PROGS_ID,
    payload: Data,
  };
};

export const setMonth = () => {
  return {
    type: ActionTypes.SET_MONTH,
  };
};

export const setMonthfor = (Data) => {
  return {
    type: ActionTypes.MONTH,
    payload: Data,
  };
};

export const setYear = (Data) => {
  return {
    type: ActionTypes.YEAR,
    payload: Data,
  };
};

export const setName = (Data) => {
  return {
    type: ActionTypes.NAME,
    payload: Data,
  };
};

export const deleteItem = (Data) => {
  return {
    type: ActionTypes.DELETE_ITEM,
    payload: Data,
  };
};

export const setBigData = (id, name, cause, data) => {
  return {
    type: "bigdatastore",
    id: id,
    name: name,
    cause: cause,
    data: data,
  };
};

export const updateBigData = (id, name, cause, data) => {
  return {
    type: "bigdataupdate",
    id: id,
    name: name,
    cause: cause,
    data: data,
  };
};
