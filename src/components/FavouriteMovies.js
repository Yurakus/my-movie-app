import React, { Component } from 'react';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

function ListItemLink(props) {
  return <ListItem button component={Link}{...props} />; 
}

export default class FavouriteMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favourites: [],
    }
  }

  componentDidMount () {
    const favouriteMovies = JSON.parse(localStorage.getItem('favouriteMovies')) || [];
    this.setState({favourites : favouriteMovies})
  }

  render () {
    return(
      <Paper className={'movie-detail-paper'}>
        <Tooltip title="Click on movie to see details" aria-label="click to see details">
          <List component="nav" aria-label="favourite movies">
            {this.state.favourites.map((movie) =>
              <ListItemLink key={movie.imdbID} to={{ pathname: '/movie-detail', state: { movie: movie}}}>
                <ListItemText primary={movie.Title} />
              </ListItemLink>
            )}
            {this.state.favourites.length === 0 && 'No Favourite Movies'}
          </List>
        </Tooltip>
      </Paper>
    )
  }
}
