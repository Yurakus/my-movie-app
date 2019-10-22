import React, { Component } from 'react';
import Img from 'react-image';
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Typography from '@material-ui/core/Typography';

export default class SearchResults extends Component {
  render () {
    return(
      <div>
        {this.props.results.length > 0 &&
        <Table aria-label="custom pagination table">
          <TableBody>
            {this.props.results.map(movie => (
              <TableRow key={movie.imdbID}>
                <TableCell style={{ width: 100 }}>
                  <Img src={movie.Poster} className="movie-img"/>
                </TableCell>
                <TableCell>
                  <Typography component="p">
                    {movie.Title}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="p">
                    {movie.Year}
                  </Typography>                
                </TableCell>
                <TableCell align="right">
                  <Typography component="p">
                    <Link to={{
                      pathname: '/movie-detail',
                      state: {
                        movie: movie
                      }
                    }}>See Details</Link>
                  </Typography>
                </TableCell>
              </TableRow>              
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={this.props.totalResults}
                rowsPerPage={10}
                page={this.props.page}
                onChangePage={this.props.onChangePage}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
        }
      </div>
    )
  }
}
