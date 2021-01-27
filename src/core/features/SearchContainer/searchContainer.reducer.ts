import { SearchState } from "./searchContainer.state";
import * as acts from "./searchContainer.actions";

const initialState: SearchState = {
  movies: [],
  authors: [],
  error: false,
};

const reducer = (
  state = initialState,
  action: acts.MoviesActionsTypes
): SearchState => {
  switch (action.type) {
    case acts.SearchActions.GET_MOVIES_SUCCESSES:
      return {
        movies: [...action.payload.movies],
        authors: [...action.payload.authors],
        error: false,
      };

    case acts.SearchActions.GET_MOVIES_FAILED:
      return {
        movies: [],
        authors: [],
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
