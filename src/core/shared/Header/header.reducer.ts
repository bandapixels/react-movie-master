import { HeaderState } from "./header.state";
import * as acts from "./header.actions";

const initialState: HeaderState = {
  listType: "list",
};

const reducer = (
  state = initialState,
  action: acts.HeaderActionsTypes
): HeaderState => {
  switch (action.type) {
    case acts.HeaderActions.UPDATE_LIST:
      return {
        listType: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
