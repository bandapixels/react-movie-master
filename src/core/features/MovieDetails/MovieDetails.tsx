import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Movie } from "../SearchContainer/searchContainer.state";
import "./movieDetails.scss";

interface MovieState {
  movie: Movie;
}

type MoviePageProps = RouteComponentProps<
  Record<string, never>,
  Record<string, never>,
  MovieState
>;

const MovieDetails: React.FunctionComponent<MoviePageProps> = ({
  location: {
    state: { movie },
  },
}) => {
  return (
    <section className="movie-section">
      <h1>{movie.title}</h1>
      <ul>
        <li>
          <span>MPAA Rating:</span>
          <span>{movie.mpaaRating}</span>
        </li>
        <li>
          <span>Byline:</span>
          <span>{movie.byline}</span>
        </li>
        <li>
          <span>Headline:</span>
          <span>{movie.headline}</span>
        </li>
        <li>
          <span>Article:</span>
          <a href={movie.article}>{movie.article}</a>
        </li>
      </ul>
      <p>{movie.summary}</p>
    </section>
  );
};

export default MovieDetails;
