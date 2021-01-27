import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../searchContainer.state";
import EmptyStar from "../../../../shared/Icons/EmptyStar";
import FullStar from "../../../../shared/Icons/FullStar";
import ExternalLink from "../../../../shared/Icons/ExternalLink";
import NoImage from "../../../../shared/Icons/NoImage";
import Button from "../../../../shared/Button/Button";
import "./cardItem.scss";

interface CardItemInterface {
  movie: Movie;
  isFavorite?: boolean;
  addToCollection?: (movie: Movie) => void;
  removeFromCollection?: (movie: Movie) => void;
  showRating?: boolean;
}

const CardItem: React.FunctionComponent<CardItemInterface> = ({
  movie,
  isFavorite,
  addToCollection,
  removeFromCollection,
  showRating,
}) => {
  const [rating, setRating] = useState(movie.rating || 0);
  const sliceText = (text: string): string => {
    return text.length > 130 ? `${text.substr(0, 150)}...` : text;
  };

  const updateRating = (updatedRating: number, movieKey: string): void => {
    const localCollection = localStorage.getItem("collection");

    if (localCollection) {
      const collection = JSON.parse(localCollection);
      const updatedCollection = collection.map((collectionMovie: Movie) => {
        if (collectionMovie.article === movieKey) {
          collectionMovie.rating = updatedRating;
        }

        return collectionMovie;
      });

      localStorage.setItem("collection", JSON.stringify(updatedCollection));
      setRating(updatedRating);
    }
  };

  return (
    <div className="card-item">
      <div className="card-item--info">
        <p className="card-item--title">{movie.title}</p>
        <p className="card-item--byline">{movie.byline}</p>
        <p className="card-item--summary">{sliceText(movie.summary)}</p>
        {showRating ? (
          <div className="card-item--rating">
            <Button
              onClick={(): void => updateRating(+rating - 1, movie.article)}
            >
              -
            </Button>
            <p>{rating}</p>
            <Button
              onClick={(): void => updateRating(+rating + 1, movie.article)}
            >
              +
            </Button>
          </div>
        ) : null}
      </div>
      <div className="card-item--media">
        {movie.media ? (
          <img src={movie.media} alt={movie.title} />
        ) : (
          <NoImage />
        )}
      </div>
      <div className="card-item--icons">
        {isFavorite ? (
          <Button
            onClick={
              removeFromCollection
                ? (): void => {
                    removeFromCollection(movie);
                  }
                : undefined
            }
          >
            <FullStar />
          </Button>
        ) : (
          <Button
            onClick={
              addToCollection
                ? (): void => {
                    addToCollection(movie);
                  }
                : undefined
            }
          >
            <EmptyStar />
          </Button>
        )}
        <Link to={{ pathname: "movie-detail", state: { movie } }}>
          <ExternalLink />
        </Link>
      </div>
    </div>
  );
};

export default CardItem;
