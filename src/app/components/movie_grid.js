import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getLatestMovies } from 'app/actions/movies';
import { getAccount } from 'app/actions/accounts';
import styles from './movie_grid.scss';
import MovieItem from 'app/components/movie_item';
import { MOVIE_API_URL, MOVIE_API_KEY } from 'app/config';
import { Link } from 'react-router-dom';
import Helpers from '../helpers';

class MovieGrid extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      page: 1,
      total_pages: 0,
      per_page: 10,
      movies: this.props.movies
    }
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies(movies) {
    const url = `${MOVIE_API_URL}popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`;

    fetch(url).then(function (response) {
      return response.json();
    }).then(function (items) {
      this.setState({
        page: items.page,
        total_pages: items.total_pages
      });

      this.props.getMovies(Helpers.chunkArray(items.results, this.state.per_page)[this.state.page - 1]);
    }.bind(this));
  }

  

  setPaidMovies(movies, paids) {
    for (let i = 0; i < movies.length; i++) {
      this.findOwnedMovie(movies[i], paids) ?
        movies[i].paid = true :
        movies[i].paid = false
    }
    
    return movies;
  }

  findOwnedMovie(movie, paids) {
    let result = false;

    for (let x = 0; x < paids.length; x++) {
      if (typeof paids[x].id === 'undefined') {
        return result;
      }

      if (paids[x].id === movie.id) {
        return true;
      }
    }

    return result;
  }

  render() {
    return (
      <div className='movie-grid'>
        <h3 className="grid-title">Latest Movies</h3>
        <div className="grid-wrapper">
          {
            this.props.movies.map((movie, index) => {
              return (
                <MovieItem key={index} movie={movie} />
              );
            })
          }

          <nav className="pagination">
            {
              this.props.movies.map((movie, index) => {
                return (
                  <Link key={movie.id} to={`/?page=${index + 1}`}>{index + 1}</Link>
                );
              })
            }
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.Movies.movies,
    paid_movies: state.Accounts.paid_movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: (movies) => dispatch(getLatestMovies(movies)),
    getAccount: () => dispatch(getAccount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieGrid)