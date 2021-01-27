import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../searchContainer.state";
import "./listItem.scss";

interface ListItemInterface {
  movie: Movie;
}

const ListItem: React.FunctionComponent<ListItemInterface> = ({ movie }) => {
  return (
    <div className="list-item">
      <Link to={{ pathname: "movie-detail", state: { movie } }}>
        {movie.title}
      </Link>
      <span>{movie.byline}</span>
    </div>
  );
};

export default ListItem;
