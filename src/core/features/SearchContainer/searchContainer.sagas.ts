import { all, fork, take, call, put } from "@redux-saga/core/effects";
import { SagaIterator } from "@redux-saga/types";
import * as acts from "./searchContainer.actions";
import moviesRequests from "../../api/movies";
import { Movie } from "./searchContainer.state";

function* updateCountRequest(): SagaIterator {
  while (true) {
    const { payload } = yield take(acts.SearchActions.GET_MOVIES);

    try {
      const results = yield call(moviesRequests.GetMovies, payload);
      const authors = new Set();
      const movies = results.data.results.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (movie: any): Movie => {
          authors.add(movie.byline);

          return {
            title: movie.display_title,
            byline: movie?.byline,
            summary: movie?.summary_short,
            media: movie?.multimedia?.src,
            mpaaRating: movie.mpaa_rating,
            headline: movie.headline,
            article: movie?.link?.url,
            favorite: false,
          };
        }
      );

      yield put(
        new acts.GetMoviesSuccess({
          movies,
          authors: Array.from(authors) as string[],
        })
      );
    } catch (error) {
      yield put(new acts.GetMoviesFailed(true));
    }
  }
}

export default function* root(): SagaIterator {
  yield all([fork(updateCountRequest)]);
}
