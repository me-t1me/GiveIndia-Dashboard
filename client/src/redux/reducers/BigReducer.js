import { ActionTypes } from "../constants/action-types";

const BigReducer = (state = [], action) => {
  switch (action.type) {
    case "bigdatastore":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          cause: action.cause,
          data: action.data,
        },
      ];
    case ActionTypes.DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default BigReducer;
