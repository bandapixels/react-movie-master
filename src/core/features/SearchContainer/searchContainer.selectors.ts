import { AppState } from "../../store/state";
import { Movie } from "./searchContainer.state";

export const getMovies = ({ searchState: { movies } }: AppState): Movie[] =>
  movies;

export const getError = ({ searchState: { error } }: AppState): boolean =>
  error;

export const getAuthors = ({ searchState: { authors } }: AppState): string[] =>
  authors;
