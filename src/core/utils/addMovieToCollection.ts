import { Movie } from "../features/SearchContainer/searchContainer.state";

const addToCollection = (savedMovie: Movie): Movie[] => {
  const localCollection = localStorage.getItem("collection");
  const collection = localCollection ? JSON.parse(localCollection) : [];

  collection.push(savedMovie);

  localStorage.setItem("collection", JSON.stringify(collection));

  return collection;
};

export default addToCollection;
