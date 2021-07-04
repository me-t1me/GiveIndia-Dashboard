import { produce } from "immer";

import { ActionTypes } from "../constants/action-types";

const initialState = {
  data: [],
  id: "70",
  progs: [1],
};

export const Reducer = (state = initialState, { type, payload }) => {
  const updateData = (state) => {
    return produce(state, (draft) => {
      draft.data = payload;
    });
  };

  const updateId = (state) => {
    return produce(state, (draft) => {
      draft.id = payload;
    });
  };

  const updateProg = (state) => {
    return produce(state, (draft) => {
      draft.progs = payload;
    });
  };

  const updateSearch = (state) => {
    return produce(state, (draft) => {
      draft.progs = state.progs.filter((prog) => {
        return prog.name.toLowerCase().includes(payload.toLowerCase());
      });
    });
  };

  switch (type) {
    case ActionTypes.STORE_DATA:
      return updateData(state);
    case ActionTypes.STORE_ID:
      return updateId(state);
    case ActionTypes.STORE_ALL_PROG:
      return updateProg(state);
    case ActionTypes.SEARCH_PROGS:
      return updateSearch(state);
    default:
      return state;
  }
};
