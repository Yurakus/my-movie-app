import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

export default class Search extends Component {
  render () {
    return <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '10vh' }}
      >
        <form onSubmit={this.props.search} className="movie-search-form" noValidate autoComplete="off">
          <TextField
            id="movie-search"
            label="Search movies"
            className="movie-search-text-field"
            value={this.props.searchQuery}
            onChange={e => {
              this.props.onChange(e)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={this.props.search}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            variant="outlined"
          />
        </form>
      </Grid> 
    </div>;
  }
}