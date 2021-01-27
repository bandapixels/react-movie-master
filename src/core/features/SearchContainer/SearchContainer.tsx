import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../shared/Button/Button";
import ListItem from "./components/ListItem/ListItem";
import CardItem from "./components/CardItem/CardItem";
import * as acts from "./searchContainer.actions";
import { getMovies, getError, getAuthors } from "./searchContainer.selectors";
import { getListType } from "../../shared/Header/header.selectors";
import { AppState } from "../../store/state";
import { Movie } from "./searchContainer.state";
import addMovieToCollection from "../../utils/addMovieToCollection";
import removeMovieFromCollection from "../../utils/removeMovieFromCollection";
import "./searchContainer.scss";

const SearchContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: AppState) => getError(state));
  const movies = useSelector((state: AppState) => getMovies(state));
  const authors = useSelector((state: AppState) => getAuthors(state));
  const listType = useSelector((state: AppState) => getListType(state));
  const [searchValue, setSearchValue] = useState("");
  const [filterByByline, setFilterByByline] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([...movies]);
  const [favoriteMovieKeys, setFavoriteMovieKeys] = useState([] as string[]);

  const handlerFilter = (byline: string): void => {
    setFilterByByline(byline);
  };

  const updateFavoriteMovieKeys = (moviesCollection: Movie[]): void => {
    const keys = moviesCollection.map((mc: Movie) => mc.article);

    setFavoriteMovieKeys([...keys]);
  };

  const addToCollection = (savedMovie: Movie): void => {
    const collection = addMovieToCollection(savedMovie);

    updateFavoriteMovieKeys(collection);
  };

  const removeFromCollection = (removedMovie: Movie): void => {
    const collection = removeMovieFromCollection(removedMovie);

    updateFavoriteMovieKeys(collection);
  };

  useEffect(() => {
    let updatedMovies = [...movies];

    if (filterByByline.length > 0) {
      updatedMovies = movies.filter((movie) => movie.byline === filterByByline);
    }

    setFilteredMovies([...updatedMovies]);
  }, [filterByByline, movies]);

  useEffect(() => {
    const localCollection = localStorage.getItem("collection");
    const collection = localCollection ? JSON.parse(localCollection) : [];

    updateFavoriteMovieKeys(collection);
  }, []);

  return (
    <div className="search-container">
      <h1>Search for Movie Reviews</h1>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Enter movie name..."
          onChange={(e): void => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <select
          placeholder="Byline"
          disabled={!authors.length}
          onChange={(e): void => handlerFilter(e.target.value)}
        >
          {authors.length > 0 ? (
            <>
              <option value="">All</option>
              {authors.map((author) => (
                <option value={author} key={author}>
                  {author}
                </option>
              ))}
            </>
          ) : (
            <option>Byline</option>
          )}
        </select>
        <Button
          onClick={(): void => {
            setFilterByByline("");
            dispatch(new acts.GetMovies(searchValue));
          }}
        >
          Search
        </Button>
        <div className="search-results">
          {error ? (
            <p className="error">An error occurred...</p>
          ) : (
            <div>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) =>
                  listType === "list" ? (
                    <ListItem movie={movie} key={movie.title} />
                  ) : (
                    <CardItem
                      movie={movie}
                      key={movie.title}
                      isFavorite={favoriteMovieKeys.includes(movie.article)}
                      addToCollection={addToCollection}
                      removeFromCollection={removeFromCollection}
                    />
                  )
                )
              ) : (
                <p>No movie matched your criteria</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
