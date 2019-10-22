import React, { Component } from 'react'
import axios from 'axios';
import Search from './Search';
import SearchResults from './SearchResults';
import Error from './Error';

export default class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      results: [],
      totalResults: 0,
      page: 0,
      errorMessage: null
    }

    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  onSearchQueryChange(e) {
    this.setState({searchQuery: e.target.value});
  }

  onSearch(e) {
    e.preventDefault();
    this.setState({page: 0});
    this.fetchMovies(1);
  }

  onPaginationChange(event, newPage) {
    this.setState({page: newPage})
    this.fetchMovies(newPage + 1);
  };

  fetchMovies(page) {
    axios.get('https://www.omdbapi.com/', {
      params: { 
        apikey: 'a8871d91', 
        s: this.state.searchQuery,
        page: page
    }})
    .then(res => {
      if (res.data.Response === 'False') {
        this.setState({errorMessage: res.data.Error});
      } else {
        this.setState({
          results: res.data.Search, 
          totalResults: parseInt(res.data.totalResults), 
          errorMessage: null
        });
      }
    })
    .catch(err => {
      this.setState({errorMessage: err});
      return null;
    });
  }

  render () {
    return(
      <div>
        <Search 
          searchQuery={this.state.searchQuery}
          onChange={this.onSearchQueryChange}
          search={this.onSearch}
          errorMessage={this.state.errorMessage}
        />
        {!this.state.errorMessage ?
          <SearchResults 
            results={this.state.results} 
            totalResults={this.state.totalResults}
            page={this.state.page}
            onChangePage={this.onPaginationChange}
          /> :
          <Error 
            errorMessage={this.state.errorMessage}
          />
        }
      </div>
    )
  }
}
