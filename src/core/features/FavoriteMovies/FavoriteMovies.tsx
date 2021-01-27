import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { Movie } from "../SearchContainer/searchContainer.state";
import CardItem from "../SearchContainer/components/CardItem/CardItem";
import removeMovieFromCollection from "../../utils/removeMovieFromCollection";
import "./favoriteMovies.scss";

const FavoriteMovies: React.FunctionComponent = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState([] as Movie[]);
  const [favoriteMovieKeys, setFavoriteMovieKeys] = useState([] as string[]);

  const removeFromCollection = (removedMovie: Movie): void => {
    const collection = removeMovieFromCollection(removedMovie);
    const keys = collection.map((mc: Movie) => mc.article);

    setFavoriteMovieKeys([...keys]);
  };

  const handleOnDragEnd = (result: DropResult): void => {
    if (!result.destination) return;

    const items = [...favoriteMovies];
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
    localStorage.setItem("collection", JSON.stringify(items));
    setFavoriteMovies(items);
  };

  useEffect(() => {
    const localCollection = localStorage.getItem("collection");
    const collection = localCollection ? JSON.parse(localCollection) : [];

    setFavoriteMovies([...collection]);
  }, [favoriteMovieKeys]);

  return (
    <section className="favorite-movies">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="draggable-movies">
          {(provided): JSX.Element => (
            <div
              className="draggable-movies"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {favoriteMovies.map((movie, index) => {
                return (
                  <Draggable
                    key={movie.title}
                    draggableId={movie.title}
                    index={index}
                  >
                    {(itemProvided): JSX.Element => (
                      <div
                        ref={itemProvided.innerRef}
                        {...itemProvided.draggableProps}
                        {...itemProvided.dragHandleProps}
                      >
                        <CardItem
                          movie={movie}
                          key={movie.title}
                          isFavorite
                          removeFromCollection={removeFromCollection}
                          showRating
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default FavoriteMovies;
