import React, { Component } from 'react';
import axios from 'axios';
import Img from 'react-image';
import Error from './Error';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      isSelected: false,
      errorMessage: null,
      isFavourite: false
    }

    this.toggleFavourite = this.toggleFavourite.bind(this);
  }

  toggleFavourite() {
    const favouriteMovies = JSON.parse(localStorage.getItem('favouriteMovies')) || [];
    const movie = this.state.movie;
    if (this.state.isFavourite) {
      const i = favouriteMovies.findIndex(x => x.imdbID === movie.imdbID);
      favouriteMovies.splice(i, 1);
      localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
    } else {
      if((favouriteMovies.findIndex(x => x.imdbID === movie.imdbID)) === -1) {
        favouriteMovies.push(movie);
        localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
      }    
    }
    this.setState({isFavourite: !this.state.isFavourite});
  }

  componentDidMount () {
    if (this.props.location.state) {
      axios.get('https://www.omdbapi.com/', {
        params: { 
          apikey: 'a8871d91', 
          i: this.props.location.state.movie.imdbID
      }})
      .then(res => {
        if (res.data.Response === 'False') {
          this.setState({errorMessage: res.data.Error});
        } else {
          this.setState({
            movie: res.data, 
            errorMessage: null,
            isSelected: true
          });
          const favouriteMovies = JSON.parse(localStorage.getItem('favouriteMovies')) || [];
          if((favouriteMovies.findIndex(x => x.imdbID === res.data.imdbID)) > -1) {
            this.setState({isFavourite: true})
          }
        }
      })
      .catch(err => {
        this.setState({errorMessage: err});
        return null;
      });
    }
  }

  render () {
    return(
      <div>
        {this.state.errorMessage && <Error errorMessage={this.state.errorMessage}/>}
        <Paper className={'movie-detail-paper'}>
          {this.state.isSelected ?
          <Grid container>
            <Grid item xs={6} md={3}>
              <Img src={this.state.movie.Poster} className="movie-detail-img"/>
            </Grid>
            <Grid item xs={6} md={9} className="movie-detail-text">
              <Typography variant="h5" component="h1">
                {this.state.movie.Title} 
                {this.state.isFavourite ? 
                  <Tooltip title="Remove from favourites" aria-label="remove from favourites">
                    <StarIcon 
                      style={{float:"right"}}
                      onClick={this.toggleFavourite}
                    ></StarIcon>
                  </Tooltip> :
                  <Tooltip title="Add to favourites" aria-label="add to favourites">
                    <StarBorderIcon 
                      style={{float:"right"}}
                      onClick={this.toggleFavourite}
                    ></StarBorderIcon>
                  </Tooltip>
                }
              </Typography>
              <Typography component="p">
                <strong>Year:</strong> {this.state.movie.Year} <br></br>
                <strong>Genre:</strong> {this.state.movie.Genre} <br></br>
                <br></br>
                {this.state.movie.Plot}
              </Typography>
            </Grid>
          </Grid> :
          'Please select movie'
          }
        </Paper>
      </div>
    )
  }
}
