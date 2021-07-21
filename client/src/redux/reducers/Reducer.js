import { produce } from "immer";

import { ActionTypes } from "../constants/action-types";

const initialState = {
  data: [],
  id: "70",
  progs: ["null"],
  searchProgs: ["null"],
  isMonthMode: true,
  month: "02",
  year: "2020",
  name: "Sponsor monthly groceries for the elderly",
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
      draft.searchProgs = state.progs.filter((prog) => {
        return prog.name.toLowerCase().includes(payload.toLowerCase());
      });
    });
  };

  const updateSearchByCause = (state) => {
    return produce(state, (draft) => {
      draft.searchProgs = state.progs.filter((prog) => {
        return prog.cause.toLowerCase().includes(payload.toLowerCase());
      });
    });
  };

  const updateSearchById = (state) => {
    return produce(state, (draft) => {
      draft.searchProgs = state.progs.filter((prog) => {
        return prog.id.toString().includes(payload.toString());
      });
    });
  };

  const updateMonthMode = (state) => {
    return produce(state, (draft) => {
      draft.isMonthMode = !state.isMonthMode;
    });
  };

  const updateMonth = (state) => {
    return produce(state, (draft) => {
      if (payload.length === 1 || payload.length === 2) {
        if (parseInt(payload) < 10) {
          draft.month = `0${payload}`;
        } else if (parseInt(payload) >= 10) {
          draft.month = payload;
        }
      }
    });
  };

  const updateYear = (state) => {
    return produce(state, (draft) => {
      if (payload.length === 4) {
        draft.year = payload;
      }
    });
  };

  const updateName = (state) => {
    return produce(state, (draft) => {
      draft.name = payload;
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
    case ActionTypes.SEARCH_PROGS_CAUSE:
      return updateSearchByCause(state);
    case ActionTypes.SEARCH_PROGS_ID:
      return updateSearchById(state);
    case ActionTypes.SET_MONTH:
      return updateMonthMode(state);
    case ActionTypes.MONTH:
      return updateMonth(state);
    case ActionTypes.YEAR:
      return updateYear(state);
    case ActionTypes.NAME:
      return updateName(state);
    default:
      return state;
  }
};
