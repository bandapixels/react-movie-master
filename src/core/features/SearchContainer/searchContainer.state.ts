export type Movie = {
  title: string;
  byline: string;
  summary: string;
  media: string;
  mpaaRating: string;
  headline: string;
  article: string;
  favorite: boolean;
  rating?: number;
};

export interface SearchState {
  movies: Movie[];
  error: boolean;
  authors: string[];
}
