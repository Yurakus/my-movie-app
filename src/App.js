import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import Header from './components/Header';
import MovieSearch from './components/MovieSearch';
import MovieDetail from './components/MovieDetail';
import FavouriteMovies from './components/FavouriteMovies';

function App() {
  return (
    <HashRouter basename='/'>
      <div>
        <Header></Header>
        <Route exact path="/" component={MovieSearch} />
        <Route path='/movie-search' component={MovieSearch}/>
        <Route path='/movie-detail' component={MovieDetail}/>
        <Route path='/my-favourite-movies' component={FavouriteMovies}/>
      </div>
    </HashRouter>
  );
}

export default App;
