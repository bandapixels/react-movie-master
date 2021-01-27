import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./core/shared/Header/Header";
import StoreLayout from "./core/layouts/StoreLayout";
import SearchContainer from "./core/features/SearchContainer/SearchContainer";
import Movie from "./core/features/MovieDetails/MovieDetails";
import FavoriteMovies from "./core/features/FavoriteMovies/FavoriteMovies";
import "./assets/scss/reset.scss";

const App: React.FunctionComponent = () => {
  return (
    <StoreLayout>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={SearchContainer} />
          <Route path="/movie-detail" component={Movie} />
          <Route path="/my-movies" component={FavoriteMovies} />
        </Switch>
      </Router>
    </StoreLayout>
  );
};

export default App;
