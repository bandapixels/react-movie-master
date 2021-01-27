import { Movie } from "../features/SearchContainer/searchContainer.state";

const removeMovieFromCollection = (removedMovie: Movie): Movie[] => {
  const localCollection = localStorage.getItem("collection");

  if (localCollection) {
    const collection = JSON.parse(localCollection);
    const updatedCollection = collection.filter(
      (collectedMovie: Movie) => collectedMovie.article !== removedMovie.article
    );
    localStorage.setItem("collection", JSON.stringify(updatedCollection));

    return updatedCollection;
  }

  return [];
};

export default removeMovieFromCollection;
