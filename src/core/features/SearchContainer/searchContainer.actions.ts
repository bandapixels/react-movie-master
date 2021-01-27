import { Action } from "../../store/state";
import { Movie } from "./searchContainer.state";

export enum SearchActions {
  GET_MOVIES = "[Search] get movies",
  GET_MOVIES_FAILED = "[Search] get movies failed",
  GET_MOVIES_SUCCESSES = "[Search] get movies successes",
}

export class GetMovies extends Action {
  readonly type = SearchActions.GET_MOVIES;

  constructor(public payload: string) {
    super();
  }
}

export class GetMoviesFailed extends Action {
  readonly type = SearchActions.GET_MOVIES_FAILED;

  constructor(public payload: boolean) {
    super();
  }
}

export class GetMoviesSuccess extends Action {
  readonly type = SearchActions.GET_MOVIES_SUCCESSES;

  constructor(public payload: { movies: Movie[]; authors: string[] }) {
    super();
  }
}
export type MoviesActionsTypes = GetMovies | GetMoviesFailed | GetMoviesSuccess;
